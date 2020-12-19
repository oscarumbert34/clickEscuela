import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistance-parents',
  templateUrl: './asistance.component.html',
  styleUrls: ['./asistance.component.scss']
})
export class AsistanceComponent implements OnInit {


  constructor() { }

  ngOnInit(): void 
  {
    console.log("holis se abrior asistencia")
  }

}
