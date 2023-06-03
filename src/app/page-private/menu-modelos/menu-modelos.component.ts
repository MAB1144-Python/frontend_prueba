import { Component, OnInit } from '@angular/core';
import { ConteoVehiculosService } from 'app/services/conteo-vehiculos.service';
import Chart from 'chart.js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-modelos',
  templateUrl: './menu-modelos.component.html',
  styleUrls: ['./menu-modelos.component.scss']
})
export class MenuModelosComponent implements OnInit {
  public res_data: any = '';

  constructor(
    private conteovehiculos: ConteoVehiculosService
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
    this.conteovehiculos.peticion().subscribe(

      data =>{
        this.res_data = JSON.parse(JSON.stringify(data));
        console.log(this.res_data['datos_Conteo_Vehiculos'][0])
        },
        (error) => {
          //this.logout()
        }
    )
      }else{
      
      }
  }

}
