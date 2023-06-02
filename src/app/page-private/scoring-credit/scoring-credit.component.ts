import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, interval, map, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { CreditService } from 'app/services/credit.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ScoringCreditService } from 'app/services/scoring-credit.service';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import { demo_doc } from 'app/models/demo_document';
import Swal from 'sweetalert2';
import Chart from 'chart.js';


@Component({
  selector: 'app-scoring-credit',
  templateUrl: './scoring-credit.component.html',
  styleUrls: ['./scoring-credit.component.scss']
})
export class ScoringCreditComponent implements OnInit {
  public chart_box: any;
  public chart_line: any;

  data$: Observable<{x: number[]} | null> = of(null);
  databar$: Observable<{x: any[], y:any[]} | null> = of(null);
  databar2$: Observable<{x: any[], y:any[]} | null> = of(null);
  doc_demo= new demo_doc("scoting_credit.xlsx",".xlsx	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  
  creditU: any = 0;
  showProgress: boolean = false;


  constructor(
    private http: HttpClient,
    private Credit_user: CreditService,
    private router: Router,
    private cookieService: CookieService,
    private ScoringCredit: ScoringCreditService,
    private demo_document: BaselineDemoDocumentService  
  ) { }


  ngOnInit(): void {
    this.currently_credit();
    if(this.creditU <= 50){
      Swal.fire({
          icon: 'warning',
          title: 'Tus creditos se estan agotando, entre a tu pasarela de pagos y adquiere más',
          showConfirmButton: false,
          timer: 5000
        })
  }
    setInterval (() => {
      this.tracedist$ = this.connectdist(this.graficas_y[1] )
      .pipe(map( (data) => {return {...data,    type: 'box',
      boxpoints: 'all',
      textinfo: "label+percent",
      textposition: "outside",
      labels: ["Data"],
      legenda: 'false'
  };}))

  this.tracebar$ = this.connectbar()
      .pipe(map( (databar) => {return {
        type: "pie",
        values: this.graficas_y[0],
        labels: this.graficas_x[0],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: false,
        showlegend: false,
  };}))

  this.tracebar2$ = this.connectbar2()
      .pipe(map( (databar) => {return {
        type: "pie",
        values: this.graficas_y[2],
        labels: this.graficas_x[2],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: false,
        showlegend: false,
  };}))
    }, 500);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0] as File;
  }

  currently_credit(): void{
    this.Credit_user.current_credit(sessionStorage.getItem('username')).subscribe(
      data =>{
        const res = JSON.parse(JSON.stringify(data));
        sessionStorage.setItem('credits',res['Número de créditos']);
      })
    this.creditU = sessionStorage.getItem('credits');
  }

  public text = '';
  public model= '';

  isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();

  loading: boolean = false; // Flag variable
  file: File | null | undefined = null;

  predict_multi: any[] = [];
  predict_texto: any[] = [];
  predict_rs: boolean = false;

  graficas_cl: any[] = [];
  graficas_x: any[] = [];
  graficas_y: any[] = [];
  graficas_st_tx: any[] = [];
  graficas_st: any[] = [];


  cleandash(): void{
    this.predict_rs = false;
  }

  res: any;
  

  load_file() {
    let creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    
    this.ScoringCredit.predict_file_scoring(this.file).subscribe(
      data => {
        this.graficas_x = [];
        this.predict_rs = true;
        this.res = JSON.parse(JSON.stringify(data));
        document.getElementById("openModalButton")?.click();
        for(let cl in this.res["Column"]){
          let ctg = this.res["Column"][cl]
          let x_ct=[];
          let y_ct=[];
          let st_col: string[] = [];
          let st_vl: any[] = [];
          if(ctg == "numeric"){
            ctg = "bar"
            //x_ct=this.res["resumen"][cl]['data']
            for(let i in this.res["resumen"][cl]['data']){
              x_ct.push(parseInt(i))
              y_ct.push(this.res["resumen"][cl]['data'][i])
              this.predict_multi.push(this.res["resumen"][cl]['data'][i])
            }
            for(let var_it in this.res["resumen"][cl]['info']){
              st_col.push(var_it)
              st_vl.push(this.res["resumen"][cl]['info'][var_it])
            }
          }else{
            for(let var_it in this.res["resumen"][cl]){
                x_ct.push(var_it)
                y_ct.push(this.res["resumen"][cl][var_it])
            }
            //this.graficas.push({cl:[cl,this.res["Column"][cl],x_ct,y_ct]})
          }
          this.graficas_cl.push(cl);
          this.graficas_x.push(x_ct);
          this.graficas_y.push(y_ct);
          this.graficas_st_tx.push(st_col);
          this.graficas_st.push(st_vl);

        }
        
        this.loading = true;
        //this.table_data()
        this.predict_multi= [];
        let predic = this.res = JSON.parse(JSON.stringify(this.res["Predict"]));
        for(let i in predic){
          let dt = [];
          this.predict_texto= ["Item"];
          for(let cl in predic[i]){
            this.predict_texto.push(cl);
            dt.push(predic[i][cl]);
          }
          this.predict_multi.push(dt);
      }
      this.loading = true;
      this.currently_credit();
      },
      (error) => {
        //this.logout()
        console.error(error);
      }
    );
  }

  logout () {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  onChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.item(0);
  }

  /*generan las gráficas */
  tracedist$: Observable<any> = of(null);
  layoutdist = {
    height: 400,
    width: 700,
    margin: {"t": 10, "b": 100, "l": 100, "r": 100},
    showlegend: false
  }

  connectdist(x_data: any) {
    this.data$ = interval(100).pipe(map(() => {return {x:this.graficas_y[1]}})
      );
    return this.data$;
  }

  tracebar$: Observable<any> = of(null);
  layoutbar = {
    height: 400,
    width: 400,
    margin: {"t": 50, "b": 50, "l": 50, "r": 50},
    showlegend: true
    }

    connectbar() {
      this.databar$ = interval(100).pipe(map(() => {return {x: [],y: []};})
        );
      return this.databar$;
    }

  tracebar2$: Observable<any> = of(null);
  layoutbar2 = {
    height: 400,
    width: 400,
    margin: {"t": 50, "b": 50, "l": 50, "r": 50},
    showlegend: true
    }

    connectbar2() {
      this.databar$ = interval(100).pipe(map(() => {return {x: [],y: []};})
        );
      return this.databar$;
    }


    // funtion for download document demo for use of model
    base64toArrayBuffer(base64: string) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }

    base_demo_document(): void {
      this.demo_document.baseline_demo_document(this.doc_demo.name_doc).subscribe(
        data => {

          const res = JSON.parse(JSON.stringify(data));
          console.log(res['body'])
          var byteArr = this.base64toArrayBuffer(res['body']);
          var FileSaver = require('file-saver');
          var blob = new Blob([byteArr], { type: this.doc_demo.type_doc });
          FileSaver.saveAs(blob, this.doc_demo.name_doc );

        },
        (error) => {
          console.error(error);
          //this.logout();
        }
      );
    }

}