import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { CreditService } from 'app/services/credit.service';
import { CookieService } from 'ngx-cookie-service';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import { demo_doc } from 'app/models/demo_document';
import { ClinicalTaxonomyService } from 'app/services/clinical-taxonomy.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js';


@Component({
  selector: 'app-clinical-taxonomy',
  templateUrl: './clinical-taxonomy.component.html',
  styleUrls: ['./clinical-taxonomy.component.scss']
})
export class ClinicalTaxonomyComponent implements OnInit, AfterViewInit {
  public chart: any;
  reloading_graphic = 1; // Flag variable
  file: File | null = null;
  apiResponse: any;
  uploadProgress: number = 0;
  showProgress: boolean = false;
  creditU: any = 0;
  chartData: number[] = [];
  chartLabels: string[] = [];
  doc_demo= new demo_doc("document_clinical_taxonomy.pdf","application/pdf");
  predict_multi: any[] = [];
  predict_multi_tx: any[] = [];
  predict_multi_est: any[] = [];
  predict_multi_tx_est: any[] = [];
  predict_rs: boolean = false;
  loading: boolean = false; // Flag variable

  constructor(
    private http: HttpClient,
    private Credit_user: CreditService,
    private cookieService: CookieService,
    private demo_document: BaselineDemoDocumentService,
    private ClinicalTax: ClinicalTaxonomyService
  ) { }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const chartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = chartCanvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.predict_multi_tx,
        datasets: [{
          label: 'Data',
          data: this.predict_multi,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  /*extractDataFromApiResponse(): void {
    if (this.apiResponse && this.apiResponse.resumen && this.apiResponse.resumen.data) {
      const data = this.apiResponse.resumen.data;
      this.chartLabels = ['organ', 'disease', 'antigen', 'adulthood', 'medicine','benchmark','consequence_type','neural_network','newborn','childhood',
                          'hybrid','pathogen','poison','professional','treatment','urgency_type','virus'];
      this.chartData = Object.values(data);
      this.renderChart();
    }
  }*/

  onFileSelected(event: any) {
    this.file = event.target.files[0] as File;
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
  }

  
  currently_credit(): void{
    this.Credit_user.current_credit(sessionStorage.getItem('username')).subscribe(
      data =>{
        const res = JSON.parse(JSON.stringify(data));
        sessionStorage.setItem('credits',res['Número de créditos']);
      })
    this.creditU = sessionStorage.getItem('credits');
  }

  /*uploadFile() {
    const url = 'https://backend-api-app.caobalab.co/user/clinical_taxonomy/';

    const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.cookieService.get('access_token'));

    const formData: FormData = new FormData();
    formData.append('pdf_file', this.file as Blob);

    this.showProgress = true;
    this.uploadProgress = 0;

    this.http.post(url, formData, { headers, reportProgress: true, observe: 'events' }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          console.log(event.body);
          this.apiResponse = event.body;
          this.showProgress = false;
          this.extractDataFromApiResponse();
          console.log(this.apiResponse);
        }
      },
      error => {
        console.error(error);
        this.showProgress = false;
      }
    );
  }*/

  
  load_file(): void {
    let creditU = sessionStorage.getItem('credits');
    this.uploadProgress = 0;
    this.reloading_graphic = 2;
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    this.ClinicalTax.predict_file_clinical(this.file).subscribe(
      data => {
        /*console.log("tipo data",data.type)
        if (data.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((data.loaded / data.total) * 100);
        } else if (data.type === HttpEventType.Response) {*/
          this.predict_multi = []
          this.predict_multi_tx = []
          this.predict_multi_est = []
          this.predict_multi_tx_est = []
          this.predict_rs = true;
          const res = JSON.parse(JSON.stringify(data));
          for(let pr in res['Predic']){
            this.predict_multi_tx.push(pr)
            this.predict_multi.push(res['Predic'][pr]*100)
          }
          for(let pr in res["resumen"]["info"]){
            this.predict_multi_tx_est.push(pr)
            this.predict_multi_est.push(res["resumen"]["info"][pr])
          }
          this.loading = true;
          this.currently_credit();
          this.renderChart();
          this.reloading_graphic = 1;
      
      },
      (error) => {
        console.error(error);
        //this.logout();
      }
    );
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

