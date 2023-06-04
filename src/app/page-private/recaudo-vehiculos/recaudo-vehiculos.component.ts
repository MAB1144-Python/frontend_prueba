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
  public filtro_registros = 0;
  public uq_estaciones = [""];
  public uq_sentido = [""];
  public uq_categoria = [""];
  public sel_estacion = "";
  public sel_sentido = "";
  public sel_categoria = "";
  public date_ini = "";
  public date_fin = "";
  public horas = [];
  public hora_ini = "";
  public hora_fin = "";

  constructor(
    private recaudovehiculos: RecaudoVehiculosService
  ) { }

  ngOnInit(): void {
    for(let i = 0; i<24; i++ ){
      this.horas.push(i)
    }
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
    //sel_estacion,sel_sentido,sel_categoria
    if (this.hora_ini == ''){
      this.hora_ini = '0'
    }
    if (this.hora_fin == ''){
      this.hora_fin = '0'
    }
    let fecha_hora_ini = this.date_ini+"-"+this.hora_ini
    let fecha_hora_fin = this.date_fin+"-"+this.hora_fin
    this.recaudovehiculos.peticion(this.sel_estacion,this.sel_sentido,this.sel_categoria,fecha_hora_ini,fecha_hora_fin).subscribe(

      data =>{
        this.res_data = JSON.parse(JSON.stringify(data));
        this.total_registros = this.res_data['n_registros'];
        this.uq_estaciones = this.res_data['UQ_estacion'];
        this.uq_sentido = this.res_data['UQ_sentido'];
        this.uq_categoria = this.res_data['UQ_categoria'];
        this.filtro_registros = this.res_data['datos_Recaudo_Vehiculos'].length
        this.date_ini = this.res_data['fecha_min'][0]+"-"+this.res_data['fecha_min'][1]+"-"+this.res_data['fecha_min'][2];
        this.date_fin =this.res_data['fecha_max'][0]+"-"+this.res_data['fecha_max'][1]+"-"+this.res_data['fecha_max'][2];
        this.hora_ini = this.res_data['fecha_min'][3];
        this.hora_fin = this.res_data['fecha_max'][3];

        },
        (error) => {
          //this.logout()
        }
    )
      }else{
      
      }
  }
  
  updatedata_cv_clear(): void{
    if(true){
    let creditU = sessionStorage.getItem('credits');
    Swal.fire({
      position: 'center',
      title: 'Sin Filtro',
      showConfirmButton: true,
      timer: 5000
    })
    this.recaudovehiculos.peticion("","","","","").subscribe(

      data =>{
        this.res_data = JSON.parse(JSON.stringify(data));
        this.total_registros = this.res_data['n_registros'];
        this.uq_estaciones = this.res_data['UQ_estacion'];
        this.uq_sentido = this.res_data['UQ_sentido'];
        this.uq_categoria = this.res_data['UQ_categoria'];
        this.filtro_registros = this.res_data['datos_Recaudo_Vehiculos'].length
        this.date_ini = this.res_data['fecha_min'][0]+"-"+this.res_data['fecha_min'][1]+"-"+this.res_data['fecha_min'][2];
        this.date_fin =this.res_data['fecha_max'][0]+"-"+this.res_data['fecha_max'][1]+"-"+this.res_data['fecha_max'][2];
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
