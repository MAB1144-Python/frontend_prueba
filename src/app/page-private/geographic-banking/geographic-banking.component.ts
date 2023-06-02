import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject, interval, map, of, Subject} from 'rxjs';

import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { CreditService } from 'app/services/credit.service';

import { GeographicBankingService } from 'app/services/geographic-banking.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { respuesta } from 'app/models/result';
import { var_num } from 'app/models/result';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import { demo_doc } from 'app/models/demo_document';
import Chart from 'chart.js';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-geographic-banking',
  templateUrl: './geographic-banking.component.html',
  styleUrls: ['./geographic-banking.component.scss']
})
export class GeographicBankingComponent implements OnInit {
    public chart_box: any;
    public chart_line: any;
    data$: Observable<{x: number[]} | null> = of(null);
    datalinea$: Observable<{x: number[], y:number[]} | null> = of(null);
    doc_demo= new demo_doc("bancarización_geografica.xlsx",".xlsx	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    apiResponse: any;
    uploadProgress: number = 0;
    showProgress: boolean = false;
    creditU: any = 0;
    chartData: number[] = [];
    chartLabels: string[] = [];
    reloading_graphic: boolean = true; // Flag variable

  
    res1 = new respuesta([],[],[],[],[],[]);
    var_num1 = new var_num('',[],[],[],[]);

    constructor(
      private http: HttpClient,
      private Credit_user: CreditService,
      private router: Router,
      private cookieService: CookieService,
      private Geographic: GeographicBankingService,
      private demo_document: BaselineDemoDocumentService
      ) {
    }
  
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
      setInterval(() => {
        //this.createChart_box();
        this.createChart_line();
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
    loading: boolean = false; // Flag variable
    file: File | null | undefined = null;
  
    isDtInitialized: boolean = false;
    dtTrigger: Subject<any> = new Subject<any>();
  
    filename!: string;
    proba!: string;
    mesg!: string;
    actual!: any;
    images$: any[] = [];
  
    rs: any[] = [];
    num: any[] = [];
    num1: any[] = [];
    num2: any[] = [];
    key: any[] = [];
  
    predict_rs: boolean = false;
    predict_rs2: boolean = false;
    public models: String[] = [];
  
    cleandash(): void{
      this.predict_rs = false;
      this.predict_rs2 = false;
    }
  
  
    load_file(): void {
      let creditU = sessionStorage.getItem('credits');
      Swal.fire({
        position: 'center',
        title: 'Usted tiene '+creditU +' creditos disponibles',
        showConfirmButton: true,
        timer: 5000
      })
      this.Geographic.predict_file_geographic(this.file).subscribe(
        data => {
          this.predict_rs = true;
          const res = JSON.parse(JSON.stringify(data));
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
            this.res1.predict_multi_predic.push(data[0])
            this.res1.predict_texto_predic.push(data_tx)
          }
          for(let row_d in res["Column"]){
            this.res1.predict_multi_column.push(res["Column"][row_d])
            this.res1.predict_texto_column.push(row_d)
          }
          for(let ky in res["resumen"]){
              let type = res["Column"][ky]
              this.var_num1.varres = ky;
              if(type == "numeric"){
                for(let dt in res["resumen"][ky]["data"]){
                  this.var_num1.x.push(dt)
                  this.var_num1.y.push(res["resumen"][ky]["data"][dt])
                }
                for(let dt in res["resumen"][ky]["info"]){
                  this.var_num1.std.push(dt)
                  this.var_num1.std_val.push(res["resumen"][ky]["info"][dt])
                }
              }
          }
          this.reloading_graphic = true;
          this.currently_credit();
          this.loading = true;
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
      createChart_box(){
        //destroy prev chart instance
  
       this.chart_box = new Chart("MyChart_box", {
         type: 'boxplot',// Tipo de gráfica. Puede ser dougnhut o pie
         data: {
              labels: ['box'],
             datasets: [
               {
                 data: [[10,12,11,15,42,15,11,60]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
                 // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
                 backgroundColor: [
                   '#0048B363',
                     '#0DBBFC63',
                 ],// Color de fondo
                 borderColor: [
                   '#0048B3',
                   '#0DBBFC',
                 ],// Color del borde
                 borderWidth: 1,// Ancho del borde
             }
                 // Aquí más datos...
             ]
         },
         options:{
          scales: {
            y:{
              beginAtZero: true
            }
          }
         }
       });
     }
     createChart_line(){
      //destroy prev chart instance
      
    if (this.reloading_graphic) {
     let lab = [];
     var len = this.res1.predict_multi_predic.length;
     for (var i = 0; i < len; i++) {
      lab.push(i)
     }
     console.log(lab)
     console.log(this.res1.predict_multi_predic)
     this.chart_line = new Chart("MyChart_line", {
       type: 'line',// Tipo de gráfica. Puede ser dougnhut o pie
       data: {
           labels:lab,
           datasets: [
             {
              label: 'Predicción',
              data: this.res1.predict_multi_predic,
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
              tension: 0.1
  
           }
               // Aquí más datos...
           ]
          }
     });
     this.reloading_graphic = false
    }
   }
  }

