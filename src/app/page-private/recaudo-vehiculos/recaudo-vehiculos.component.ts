import { Component, OnInit } from '@angular/core';
import { ConteoVehiculosService } from 'app/services/conteo-vehiculos.service';
import { RecaudoVehiculosService } from 'app/services/recaudo-vehiculos.service';
import Chart from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recaudo-vehiculos',
  templateUrl: './recaudo-vehiculos.component.html',
  styleUrls: ['./recaudo-vehiculos.component.scss']
})
export class RecaudoVehiculosComponent implements OnInit {
  public res_data: any = '';
  public total_registros = 0;

  constructor(
    private recaudovehiculos: RecaudoVehiculosService
  ) { }

  ngOnInit(): void {
    this.updatedata_cv()
  }

  updatedata_cv(): void{
    if(true){
    let creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Usted tiene '+creditU +' creditos disponibles',
      showConfirmButton: true,
      timer: 5000
    })
    this.recaudovehiculos.peticion().subscribe(

      data =>{
        this.res_data = JSON.parse(JSON.stringify(data));
        this.total_registros = this.res_data['datos_Recaudo_Vehiculos'].length
        console.log(this.res_data['datos_Recaudo_Vehiculos'])
        },
        (error) => {
          //this.logout()
        }
    )
      }else{
      
      }
  }


}
