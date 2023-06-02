import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject, interval, map, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { CreditCardService } from 'app/services/credit-card.service';
import { demo_doc } from 'app/models/demo_document';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreditService } from 'app/services/credit.service';
import { respuesta } from 'app/models/result';
import { var_cat } from 'app/models/result';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})

export class CreditCardComponent implements OnInit  {
  reloading_graphic = 1; // Flag variable

  datapie1$: Observable<{x: number[], y:number[]} | null> = of(null);
  datapie2$: Observable<{x: number[], y:number[]} | null> = of(null);
  datapie3$: Observable<{x: number[], y:number[]} | null> = of(null);
  doc_demo= new demo_doc("credict_card.xlsx",".xlsx	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  showProgress: boolean = false;
  creditU: any = 0;
  apiResponse: any;
  uploadProgress: number = 0;
  public chart: any;
  
  res1 = new respuesta([],[],[],[],[],[]);
  var_cat1 = new var_cat('',[],[]);
  var_cat2 = new var_cat('',[],[]);
  var_cat3 = new var_cat('',[],[]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private Credit_user: CreditService,
    private cookieService: CookieService,
    private Creditcard:CreditCardService,
    private demo_document: BaselineDemoDocumentService
  ) { }

  ngOnInit(): void {
    this.tracepie1$ = this.connectpie1()
    .pipe(map( (datapie1) => {return {
      type: "pie",
      values: this.var_cat1.count,
      labels: this.var_cat1.cat,
      textinfo: "label+percent",
      textposition: "outside",
      automargin: false,
      showlegend: true,
    };}))
    this.tracepie2$ = this.connectpie2()
    .pipe(map( (datapie2) => {return {
      type: "pie",
      values: this.var_cat2.count,
      labels: this.var_cat2.cat,
      textinfo: "label+percent",
      textposition: "outside",
      automargin: false,
      showlegend: true,
    };}))
    this.tracepie3$ = this.connectpie3()
    .pipe(map( (datapie3) => {return {
      type: "pie",
      values: this.var_cat3.count,
      labels: this.var_cat3.cat,
      textinfo: "label+percent",
      textposition: "outside",
      automargin: false,
      showlegend: true,
    };}))
    
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
  loading: boolean = false; // Flag variable
  file: File | null | undefined = null;

  isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();

  filename!: string;
  proba!: string;
  mesg!: string;
  actual!: any;

  rs: any[] = [];
  key: any[] = [];
  datos: any[] = [];
  predict: any[] = [];
  predict_multi: any[] = [];
  predict_rs: boolean = false;
  predict_rs2: boolean = false;
  public models: String[] = [];

  cleandash(): void{
    this.predict_rs = false;
    this.predict_rs2 = false;
  }

  load_file(): void {
    let creditU = sessionStorage.getItem('credits');
    this.reloading_graphic = 2;
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    this.Creditcard.predict_file_credict(this.file).subscribe(
      data => {
        this.predict_rs = true;
        const res = JSON.parse(JSON.stringify(data));
        console.log(res)
        for(let row_d in res["datos"]){
          let data = []
          let data_tx = []
          this.res1.predict_texto_data = []
          for(let dt in res["datos"][row_d]){
            data_tx.push(dt)
            data.push(res["datos"][row_d][dt])
          }
          this.res1.predict_multi_data.push(data)
          this.res1.predict_texto_data.push(data_tx)
        }
        for(let row_d in res["Predic"]){
          let data = []
          let data_tx = []
          for(let dt in res["Predic"][row_d]){

            data_tx.push(dt)
            data.push(res["Predic"][row_d][dt])
          }
          this.res1.predict_multi_predic.push(data)
          this.res1.predict_texto_predic.push(data_tx)
        }
        for(let row_d in res["Column"]){
          this.res1.predict_multi_column.push(res["Column"][row_d])
          this.res1.predict_texto_column.push(row_d)
        }
        this.var_cat1.varres = "predict_rf";
        for(let dt in res["resumen"]["predict_rf"]){
              this.var_cat1.cat.push(dt)
              this.var_cat1.count.push(res["resumen"]["predict_rf"][dt])
            }
        this.var_cat1.varres = "predict_rf";
        for(let dt in res["resumen"]["predict_km"]){
              this.var_cat2.cat.push(dt)
              this.var_cat2.count.push(res["resumen"]["predict_rf"][dt])
            }
        this.var_cat1.varres = "predict_rf";
        for(let dt in res["resumen"]["categorización"]){
              this.var_cat3.cat.push(dt)
              this.var_cat3.count.push(res["resumen"]["categorización"][dt])
            }
        this.loading = true;
        this.reloading_graphic = 1;
        this.currently_credit();
      },
      (error) => {
        console.error(error);
        //this.logout();
      }
    );
  }


  load_file2(): void {
    this.Creditcard.predict_file_credict(this.file).subscribe(
      data => {
        this.predict_multi = []
        this.predict_rs = true;
        const res = JSON.parse(JSON.stringify(data));
        for(let pr in res["filename"]["prediction_multiple"]){
          let dt_1 =[]
          for(let pr_sub in res["filename"]["prediction_multiple"][pr]){
            dt_1.push(res["filename"]["prediction_multiple"][pr][pr_sub]);
          }
          this.predict_multi.push(dt_1)
        }
      },
      (error) => {
        console.error(error);
        //this.logout();
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
   tracepie1$: Observable<any> = of(null);
   tracepie2$: Observable<any> = of(null);
   tracepie3$: Observable<any> = of(null);
   layout = {
     height: 400,
     width: 700,
     margin: {"t": 10, "b": 100, "l": 100, "r": 100}
   }

  connectpie1() {
    this.datapie1$ = interval(100).pipe(map(() => {return {x:[],y: []}})
      );
    return this.datapie1$;
  }
  connectpie2() {
    this.datapie2$ = interval(100).pipe(map(() => {return {x:[],y: []}})
      );
    return this.datapie2$;
  }
  connectpie3() {
    this.datapie3$ = interval(100).pipe(map(() => {return {x:[],y: []}})
      );
    return this.datapie3$;
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
    /*fin demo document */
}
