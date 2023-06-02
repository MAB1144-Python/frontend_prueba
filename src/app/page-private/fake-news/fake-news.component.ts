import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreditService } from 'app/services/credit.service';
import { FakeNewsService } from 'app/services/fake-news.service';
import { of, Observable } from 'rxjs';
import Chart from 'chart.js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fake-news',
  templateUrl: './fake-news.component.html',
  styleUrls: ['./fake-news.component.scss'],

  moduleId: module.id

})
export class FakeNewsComponent  {
  reloading_graphic = 1; // Flag variable
  public chart_fn: any;
  public text = '';
  public model= '';
  data$: Observable<{x: any[], y:any[]} | null> = of(null);
  clasification = ' '
  prob = 0;
  loading: boolean = false; // Flag variable
  rs: any[] = ['Probabilidad'];
  public txt_hp = "Un video espeluznante ha causado sensación en las redes sociales, mostrando a un grupo de jóvenes mientras realizan ejercicio, cuando de repente, una máquina de ejercicio comienza a moverse sin ayuda alguna."

  modelId: string='NB_cp';
  creditU: any = 0;
  apiResponse: any;
  disableButton = true;


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private Credit_user: CreditService,
    private Fakenews: FakeNewsService,
    ) {}

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

  /*callApi() {
    const url = 'https://backend-api-app.caobalab.co/user/fakenews/';
    const requestBody = {
      text: this.text,
      model_id: this.modelId
    };

    const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.cookieService.get('access_token'));
    
    this.http.post(url, requestBody, { headers }).subscribe(
      response => {
        console.log(response);
        this.apiResponse=response;
        this.currently_credit();
      },
      error => {
        console.error(error);
      }
    );
  }*/

  
  updatetext(): void{
    this.reloading_graphic = 2;
    if(this.text == "" || this.model == ""){
      let creditU = sessionStorage.getItem('credits');
      Swal.fire({
        position: 'center',
        title: 'recuerde debe diligenciar todos los campos',
        showConfirmButton: true,
        timer: 3000
      })
    }
    if(this.text != "" &&  this.model == ""){
      let creditU = sessionStorage.getItem('credits');
      Swal.fire({
        position: 'center',
        title: 'Usted tiene '+creditU +' creditos disponibles',
        showConfirmButton: true,
        timer: 5000
      })
      this.Fakenews.predictfake_news(this.text, this.model).subscribe(
        data =>{
          this.rs = []
          this.loading = true;
          const res = JSON.parse(JSON.stringify(data));
          this.rs.push(res["prediction_text"]);
          this.rs.push("tiene una clasificación de "+res["prediction_class"]);
          this.clasification = res["prediction_class"]
          this.prob = res["prediction_probability"]*100
          this.reloading_graphic = 1;
          this.currently_credit();
        }
      )
    }else{
      this.rs.push("No text for prediction");

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

// Verifica el textarea tenga como minimo 19 palabras , de lo contrario desabilita el boton submit.
checkWordCount(): void {
  const wordCount = this.text.trim().split(/\s+/).length;
  this.disableButton = wordCount < 20;
}


  createChart_pie(){
    //destroy prev chart instance

    if (this.reloading_graphic == 1) {
   this.chart_fn = new Chart("MyChart_fn", {
     type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
     data: {
         labels: [this.rs[0]],
         datasets: [
           {
             data: [ this.prob, 100-this.prob], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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
