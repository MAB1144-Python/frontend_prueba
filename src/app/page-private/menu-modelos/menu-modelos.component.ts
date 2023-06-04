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

  }



}
