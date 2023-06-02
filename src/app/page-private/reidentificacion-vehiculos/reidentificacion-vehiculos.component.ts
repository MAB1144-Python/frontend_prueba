
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { interval, map, of, } from 'rxjs';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ReidentificacionVehiculosService } from 'app/services/reidentificacion-vehiculos.service';
import { BaselineDemoDocumentService } from 'app/services/baseline-demo-document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { demo_doc } from 'app/models/demo_document';
import Chart from 'chart.js';


@Component({
  selector: 'app-reidentificacion-vehiculos',
  templateUrl: './reidentificacion-vehiculos.component.html',
  styleUrls: ['./reidentificacion-vehiculos.component.scss']
})
export class ReidentificacionVehiculosComponent implements OnInit {
  public chart_rv_1: any;
  doc_demo= new demo_doc("","image/png");

  isDtInitialized: boolean = false;
  reloading_graphic = 1; // Flag variable

  //BEGIN TABLE VARIABLES
  dtTrigger: Subject<any> = new Subject<any>();
  model$: any[] = [];
  //END TABLE VARIABLES
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  [x: string]: any;
  _iter = 0;
  data$: Observable<{x: number[], y:number[]} | null> = of(null);
  data2$: Observable<{x: any[], y:any[]} | null> = of(null);
  data3$: Observable<{x: any[], y:any[]} | null> = of(null);
  loading: boolean = false; // Flag variable
  filt: boolean = true; // Flag variable
  arc_up = ["Ingrese la imagen de la placa","Ingrese la imagen de la placa","Ingrese la imagen del vehículo","Ingrese la imagen del vehículo"];
  cont_arc = 0;


  //BEGIN TABLE VARIABLES
  file: File | null | undefined = null;

  mesg!: string;
  actual!: any;

  images$: any[] = [];
  file_array: any[] = [];
  Coincidence = "Esperando predicción";
  Probability = 0;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private reindentificacion: ReidentificacionVehiculosService,
    private demo_document: BaselineDemoDocumentService,
    private sanitizer: DomSanitizer
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
      this.createChart_pie();
    }, 500);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }

  updatetext(): void{
  }

  clear(){
    this.imagePath = [];
    this.imgURL = [];
    this.message = "";
    this.Coincidence = "Esperando predicción";
    this.Probability = 0;
  }

  Prediccion(){
    let creditU = sessionStorage.getItem('credits');
    console.log("lin 91")
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
    this.reindentificacion.predictreidentificacion(this.file_array).subscribe(
      data => {
        const res = JSON.parse(JSON.stringify(data));
        this.Coincidence = res["Coincidence"];
        this.Probability = res["Probability"]*100;
        this.loading = true;
        this.reloading_graphic = 1;
      },
      (error) => {
        this.loading = false;
        //this.logout()
        console.error(error);
      }
    );
  }

  loadImage() {
    this.file_array.push(this.file);
    this.cont_arc = this.file_array.length;
  }


  onChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.item(0);
    this.loadImage()
  }

  logout () {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  imgChangeEvt: any[] = [];
  cropImgPreview: any[] = [];
  onFileChange(event: any): void {
      this.imgChangeEvt.push(event);
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview.push(e.base64);
  }
  urls=[];

  public imagePath: any []= [];
  imgURL: any []= [];
  public message: string= "";

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath.push(files);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL.push(reader.result);
    }
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

// image es la cadena codificada en base64 de la imagen
// filename es el nombre de archivo deseado para la imagen PNG
downloadImage(image: string, filename: string) {
  const byteString = atob(image.split(',')[1]);

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: 'image/png' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

base_demo_document(imag: string): void {
  this.doc_demo.name_doc = imag
  this.demo_document.baseline_demo_document(this.doc_demo.name_doc).subscribe(
    data => {

      const res = JSON.parse(JSON.stringify(data));
      const base64 = res['body'];
      let base64Image = "data:image/png;base64," + base64;
      var byteArr = this.base64toArrayBuffer(res['body']);
      var FileSaver = require('file-saver');
      var blob = new Blob([byteArr], { type: this.doc_demo.type_doc });
      FileSaver.saveAs(blob, this.doc_demo.name_doc );
    }
  );
}
/*fin demo document */
createChart_pie(){
  //destroy prev chart instance
  if (this.reloading_graphic == 2){
    var randNumber = Math.random() * 100;
    this.predict_multi = [randNumber,100-randNumber];
  }
  if (this.reloading_graphic == 1) {
    this.chart_rv_1 = new Chart("MyChart_bar_rv", {
      type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
      data: {
          labels: [this.Coincidence],
          datasets: [
            {
              data: [ this.Probability, 100-this.Probability], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
