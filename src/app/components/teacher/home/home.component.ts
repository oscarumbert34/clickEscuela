import { Component, OnInit } from '@angular/core';
import { Dashboardproperties } from 'src/app/models/dashboard-properties';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dashBoardsProperties: Dashboardproperties[] = new Array(0);
  constructor() { }

  ngOnInit() {
    this.dashBoardsProperties.push(new Dashboardproperties('Entrega TP', '80%', 'icon-card-homework'));
    this.dashBoardsProperties.push(new Dashboardproperties('Tareas sin Corregir', '13/20', 'icon-card'));
    this.dashBoardsProperties.push(new Dashboardproperties('Asistencia de alumnos', '20/20', 'icon-card-attendance'));
    this.dashBoardsProperties.push(new Dashboardproperties('Cantidad de aprobados', '15/20', 'icon-card-approved'));

  }

}
