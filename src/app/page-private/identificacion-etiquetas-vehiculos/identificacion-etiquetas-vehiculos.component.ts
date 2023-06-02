import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { interval, map, of, } from 'rxjs';
import { IdentificacionEtiquetasVehiculosService } from 'app/services/identificacion-etiquetas-vehiculos.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import { demo_doc } from 'app/models/demo_document';
import { CreditService } from 'app/services/credit.service';
import { var_num } from 'app/models/result';
import { var_cat } from 'app/models/result';
import Chart from 'chart.js';

@Component({
  selector: 'app-identificacion-etiquetas-vehiculos',
  templateUrl: './identificacion-etiquetas-vehiculos.component.html',
  moduleId: module.id
})
export class IdentificacionEtiquetasVehiculosComponent implements OnInit {
  public chart: any;
  doc_demo= new demo_doc("","image/png");
  vac_num1= new var_num('',[],[],[],[]);
  vac_cat1= new var_cat('',[],[]);

  public text = '';
  public model= '';
  rs: any[] = [];
  reloading_graphic = 1; // Flag variable
  $seleccionArchivos = document.querySelector("#seleccionArchivos");
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

  [x: string]: any;
  _iter = 0;
  data$: Observable<{x: number[], y:number[]} | null> = of(null);
  data2$: Observable<{x: any[], y:any[]} | null> = of(null);
  loading: boolean = false; // Flag variable
  //BEGIN TABLE VARIABLES
  file: File | null | undefined = null;
  mesg!: string;
  actual!: any;
  images$: any[] = [];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private services: IdentificacionEtiquetasVehiculosService,
    private demo_document: BaselineDemoDocumentService,
    private Credit_user: CreditService,
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
    setInterval(() => {
      this.createChart_bar();
    }, 500);
    

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }

  updatetext(): void{
  }

  loadImage() {
    let creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    Swal.fire({
      title: 'La carga de tu imagen puede tardar',
      text: "No salgas de esta página mientras carga",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    });
    this.loading = !this.loading;
    this.services.postImage(this.file).subscribe(
      data => {
        this.actual = data;
        const res = JSON.parse(JSON.stringify(data));
        for(let pr in res){
          this.vac_num1.x.push(res[pr]["class"])
          this.vac_num1.y.push(res[pr]["probability"]*100)
        }

        document.getElementById("openModalButton")?.click();
        if (this.chart) this.chart.destroy();
        if (this.chart) this.chart.destroy();
        this.reloading_graphic = 1;
        this.currently_credit();
        this.loading = false;

      },
      (error) => {
        this.loading = !this.loading;
        //this.logout()
        console.error(error);
      }
    );
  }
  
  currently_credit(): void{
    this.Credit_user.current_credit(sessionStorage.getItem('username')).subscribe(
      data =>{
        const res = JSON.parse(JSON.stringify(data));
        sessionStorage.setItem('credits',res['Número de créditos']);
      })
    this.creditU = sessionStorage.getItem('credits');
  }

  onChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.item(0);
  }

  logout () {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }


imgChangeEvt: any = '';
cropImgPreview: any = '';
onFileChange(event: any): void {
    this.imgChangeEvt = event;
}

cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
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

base_demo_document(imag: string): void {
  this.doc_demo.name_doc = imag
  this.demo_document.baseline_demo_document(this.doc_demo.name_doc).subscribe(
    data => {

      const res = JSON.parse(JSON.stringify(data));
      console.log(res)
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

preview(files) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}
/*fin demo document */
createChart_bar(){
  if (this.reloading_graphic == 2){
    var randNumber = Math.random() * 100;
    this.predict_multi = [randNumber,100-randNumber];
  }
  if (this.reloading_graphic == 1) {
  this.chart = new Chart("MyChart_bar", {
    type: 'bar',// Tipo de gráfica. Puede ser dougnhut o pie
    data: {
        labels: this.vac_num1.x,
        datasets: [
          {
            label: 'Identificacion etiquetas vehiculos',
            data: this.vac_num1.y, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
    }
  });
  this.reloading_graphic = 0
  }
}
}
