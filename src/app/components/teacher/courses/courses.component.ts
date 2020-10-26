import { Component, OnInit } from '@angular/core';
import { Dashboardproperties } from 'src/app/models/dashboard-properties';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  dashBoardsProperties: Dashboardproperties[] = new Array(0);
  dashBoardsProperties1: Dashboardproperties[] = new Array(0);
  dashBoardsProperties2: Dashboardproperties[] = new Array(0);

  constructor() { }

  ngOnInit() {
    this.dashBoardsProperties.push(new Dashboardproperties('Entrega TP', '50%', 'icon-card-homework'));
    this.dashBoardsProperties.push(new Dashboardproperties('Tareas sin Corregir', '20/20', 'icon-card'));
    this.dashBoardsProperties.push(new Dashboardproperties('Asistencia de alumnos', '5/20', 'icon-card-attendance'));
    this.dashBoardsProperties.push(new Dashboardproperties('Cantidad de aprobados', '2/20', 'icon-card-approved'));

    this.dashBoardsProperties1.push(new Dashboardproperties('Entrega TP', '100%', 'icon-card-homework'));
    this.dashBoardsProperties1.push(new Dashboardproperties('Tareas sin Corregir', '0/20', 'icon-card'));
    this.dashBoardsProperties1.push(new Dashboardproperties('Asistencia de alumnos', '20/20', 'icon-card-attendance'));
    this.dashBoardsProperties1.push(new Dashboardproperties('Cantidad de aprobados', '20/20', 'icon-card-approved'));

    this.dashBoardsProperties2.push(new Dashboardproperties('Entrega TP', '75%', 'icon-card-homework'));
    this.dashBoardsProperties2.push(new Dashboardproperties('Tareas sin Corregir', '10/20', 'icon-card'));
    this.dashBoardsProperties2.push(new Dashboardproperties('Asistencia de alumnos', '10/20', 'icon-card-attendance'));
    this.dashBoardsProperties2.push(new Dashboardproperties('Cantidad de aprobados', '10/20', 'icon-card-approved'));
  }

}
