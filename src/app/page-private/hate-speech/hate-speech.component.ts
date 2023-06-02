import { Component, OnInit } from '@angular/core';
import { interval, map, of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HateSpeechService } from 'app/services/hate-speech.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CreditService } from 'app/services/credit.service';



@Component({
  selector: 'app-hate-speech',
  templateUrl: './hate-speech.component.html',
  styleUrls: ['./hate-speech.component.scss']
})
export class HateSpeechComponent implements OnInit {
  public chart_hs_1: any;
  public chart_hs_2: any;
  public chart_hs_3: any;
  public txt_hp = "Tenemos que acabar el capitalismo. Debemos luchar por una Colombia en la que podamos vivir como viven nuestro hermanos y hermanas venezolanas, sin codicia, sin avaricia, sin cosas materiales, solo comiendo lo estrictamente necesario"



  isDtInitialized: boolean = false;

  //BEGIN TABLE VARIABLES
  model$: any[] = [];
  //END TABLE VARIABLES
  value = 50;

  [x: string]: any;
  public text = '';
  data$: Observable<{x: any[], y:any[]} | null> = of(null);
  rs_tx: any[] = [];
  loading: boolean = true; // Flag variable
  reloading_graphic: boolean = true; // Flag variable
  carg: boolean = false;
  creditU: any = 0;

  constructor(
    private Hatespeech:HateSpeechService,
    private Credit_user: CreditService,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Se inicializa el input como FormControl
    this.textControl = new FormControl();
   }
  prob = 0;
  rs = [0,1,0,100,0,100];

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
        this.createChart_pie_1();
        this.createChart_pie_2();
        this.createChart_pie_3();
      }, 500);

  }

  //Destroy de Trigger of the table
  ngOnDestroy(): void {
  }


  updatetext(): void{
    this.creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+this.creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    this.rs = []
    if(this.text != ""){
    this.Hatespeech.predictheatspeech(this.text).subscribe(
    data =>{
        const res = JSON.parse(JSON.stringify(data));
        console.log(res)
        this.loading = true;
        this.rs_tx = [];
        this.rs.push(res["prediction_hs"]*100);
        this.rs.push(res["prediction_no_hs"]*100);
        this.rs.push(res["prediction_ms"]*100);
        this.rs.push(res["prediction_no_ms"]*100);
        this.rs.push(res["prediction_rs"]*100);
        this.rs.push(res["prediction_no_rs"]*100);
        if(this.rs[0]<=50){
          this.rs_tx.push("El tweet NO es de ODIO! 🕊️");
        }else{
          this.rs_tx.push("El tweet es de ODIO! 👺");
        }
        if(this.rs[2]<=50){
          this.rs_tx.push("El tweet NO es de MISOGINIA! 🕊️");
        }else{
          this.rs_tx.push("El tweet es de MISOGINIA! 👺");
        }
        if(this.rs[4]<=50){
          this.rs_tx.push("El tweet NO es de RACISMO! 🕊️");
        }else{
          this.rs_tx.push("El tweet es de RACISMO! 👺");
        }
        this.reloading_graphic = true;
        this.currently_credit();
        },
        (error) => {
          this.loading = false;
          this.rs_tx.push("No prediction tweet ODIO","No prediction tweet MISOGINIA","No prediction tweet RACISMO");
          //this.rs.push("No es posible generar una predicción")
          //this.logout()
        }
    )
    this.carg = false;
      }else{
        this.loading = false;
        this.rs_tx.push("No prediction tweet ODIO","No prediction tweet MISOGINIA","No prediction tweet RACISMO");
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
  

  copytext(): void{
        // Se copia el texto del input al portapapeles
        Swal.fire({
          position: 'center',
          title: '¡Texto copiado al portapapeles!',
          showConfirmButton: true,
          timer: 2000
        })
  }

  logout () {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }



  createChart_pie_1(){
    //destroy prev chart instance
    if (this.reloading_graphic) {
        this.chart_hs_1 = new Chart("MyChart_hs_1", {
        type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
        data: {
            labels: ["🕊️","👺"],
            datasets: [
              {
                data: [this.rs[0], this.rs[1]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
    }
 }
 createChart_pie_2(){
  //destroy prev chart instance
    if (this.reloading_graphic) {
        this.chart_hs_2 = new Chart("MyChart_hs_2", {
        type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
        data: {
            labels: ["🕊️","👺"],
            datasets: [
              {
                data: [this.rs[2], this.rs[3]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
}
}
createChart_pie_3(){
  //destroy prev chart instance
  if (this.reloading_graphic) {
    this.chart_hs_3 = new Chart("MyChart_hs_3", {
      type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
      data: {
          labels: ["🕊️","👺"],
          datasets: [
            {
              data: [this.rs[3], this.rs[4]], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
    this.reloading_graphic = false
  }
}
}
