import { Component, OnInit } from '@angular/core';
import { interval, map, of, Subject } from 'rxjs';

import { ApneaService } from 'app/services/apnea.service';
import {  ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CreditService } from 'app/services/credit.service';
import Chart from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apnea',
  templateUrl: './apnea.component.html',
  styleUrls: ['./apnea.component.scss']
})
export class ApneaComponent implements OnInit {

  public chart: any;
  isDtInitialized: boolean = false;

  //BEGIN TABLE VARIABLES
  dtTrigger: Subject<any> = new Subject<any>();
  model$: any[] = [];
  //END TABLE VARIABLES
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  txt_apnea="femenina de 25 años. ap: gastritis. por resultados de examenes: 02/julio/2020 tsh elevada. 14/07/2020 glucemia basal y hba1c dentro de metas, t4l dentro de metas. ''paciente cursando con hipotiroidismo primaria, se inicia levotiroxina 25mcg c/24hrs. la paciente insiste en querer cita con endocrinologo, se le explica que su patologia hasta el momento puede ser manejada por medico general, sin embargo ella insiste; se solicita concepto de medicina interna telemedicina. se dan recomendaciones.";
  creditU: any = 0;
  [x: string]: any;
  public textapnea = '';
  _x: number[] = [];
  _y: number[] = [];
  _iter = 0;
  data$: Observable<{x: number[], y:number[]} | null> = of(null);
  data2$: Observable<{x: any[], y:any[]} | null> = of(null);
  title = 'streaming-data';
  rs: any[] = [];
  prob = 0;
  loading: boolean = false; // Flag variable
  public model= '';
  reloading_graphic = 1; // Flag variable
  constructor(
    private cookieService: CookieService,
    private Apnea: ApneaService,
    private router: Router,
    private Credit_user: CreditService,
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

  //Destroy de Trigger of the table
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  currently_credit(): void{
    this.Credit_user.current_credit(sessionStorage.getItem('username')).subscribe(
      data =>{
        const res = JSON.parse(JSON.stringify(data));
        sessionStorage.setItem('credits',res['Número de créditos']);
      })
    this.creditU = sessionStorage.getItem('credits');
  }

  updatetext(): void{
    this.reloading_graphic = 2;
    this.rs = [] 
    if(this.textapnea == "" || this.model == ""){
      let creditU = sessionStorage.getItem('credits');
      Swal.fire({
        position: 'center',
        title: 'recuerde debe diligenciar todos los campos',
        showConfirmButton: true,
        timer: 3000
      })
    }
    if(this.textapnea != "" && this.model != "" ){
    let creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    this.Apnea.predictapnea(this.textapnea,this.model).subscribe(

      data =>{
        const res = JSON.parse(JSON.stringify(data));
        this.loading = true;
        this.rs.push("Al evaluar el párrafo, el modelo genero la predicción que el paciente "+res["message"]);
        this.rs.push("con una probabilidad de "+res["probability"]);
        this.prob =res["probability"];
        this.reloading_graphic = 1;
        this.currently_credit();
        },
        (error) => {
          this.loading = false;
          this.rs.push("No es posible generar una predicción")
          //this.logout()
        }
    )
      }else{
        this.loading = false;
        this.rs.push("Ingrese in texto válido")

      }
  }

  logout () {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  /*generan las gráficas */
  // Grafica de Pie
// Las etiquetas son las porciones de la gráfica
// Podemos tener varios conjuntos de datos. Comencemos con uno
  createChart_pie(){
    if (this.reloading_graphic == 1) {
  this.chart = new Chart("MyChart_pie", {
      type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
      data: {
          labels: ["Probabilidad de Apnea"],
          datasets: [
            {
              data: [ this.prob, 1-this.prob], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
          ]
      }
    });
    this.reloading_graphic = 0
   }
  }



  copytext(): void{
    // Se copia el texto del input al portapapeles
    Swal.fire({
      position: 'center',
      title: '¡Texto copiado al portapapeles!',
      showConfirmButton: true,
      timer: 2000
    })
}


}
