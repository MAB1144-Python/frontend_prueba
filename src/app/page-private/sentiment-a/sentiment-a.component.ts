import { Component, OnInit } from "@angular/core";
import { AutofillMonitor } from "@angular/cdk/text-field";
import { SentimentAService } from "app/services/sentiment-a.service";
import Swal from "sweetalert2";
import { CookieService } from "ngx-cookie-service";
import { CreditService } from "app/services/credit.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sentiment-a",
  templateUrl: "./sentiment-a.component.html",
  styleUrls: ["./sentiment-a.component.scss"],
})
export class SentimentAComponent implements OnInit {
  public text = "";
  public model = "";
  creditU: any = 0;
  loading: boolean = false; // Flag variable
  reloading_graphic = 1; // Flag variable
  clasification = " ";
  prob = 0;
  public txt_sentiment_example =
    "Sabiais que @Iberia te trata muy bien en santiago de chile?Te cambia el asiento";

  constructor(
    private Sentiment: SentimentAService,
    private _autofill: AutofillMonitor,
    private Credit_user: CreditService,
    private cookieService: CookieService,
    private router: Router
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
  }

  rs: any[] = [];

  updatetext(): void {
    this.reloading_graphic = 2;
    if (this.text == "" || this.model == "") {
      this.creditU = sessionStorage.getItem("credits");
      Swal.fire({
        position: "center",
        title: "Recuerde debe diligenciar todos los campos",
        showConfirmButton: true,
        timer: 3000,
      });
    }
    if (this.text != "" && this.model != "") {
      console.log("validacion campos llenos");
      this.creditU = sessionStorage.getItem("credits");
      this.rs = [];
      Swal.fire({
        position: "center",
        title: "Usted tiene " + this.creditU + " creditos disponibles",
        showConfirmButton: true,
        timer: 5000,
      });
      this.Sentiment.predictsentiment_a(this.text, this.model).subscribe(
        (data) => {
          this.loading = true;
          const res = JSON.parse(JSON.stringify(data));
          for (let clave in res) {
            //const newLocal = [[clave, res[clave]]];
            this.rs.push([clave, res[clave]]);
          }
          //this.reloading_graphic = true;
          this.currently_credit();
          this.reloading_graphic = 1;
        }
      );
    } else {
      this.rs.push("No text for prediction");
    }
  }

  currently_credit(): void {
    this.Credit_user.current_credit(
      sessionStorage.getItem("username")
    ).subscribe((data) => {
      const res = JSON.parse(JSON.stringify(data));
      sessionStorage.setItem("credits", res["Número de créditos"]);
    });
    this.creditU = sessionStorage.getItem("credits");
  }

  copytext(): void {
    // Se copia el texto del input al portapapeles
    Swal.fire({
      position: "center",
      title: "¡Texto copiado al portapapeles!",
      showConfirmButton: true,
      timer: 2000,
    });
  }

  logout() {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(["/login"]);
  }
}
