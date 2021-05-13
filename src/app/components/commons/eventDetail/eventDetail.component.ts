import { CalendarEvent } from './../../../models/calendar-event';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { M } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-eventDetail',
  templateUrl: './eventDetail.component.html',
  styleUrls: ['./eventDetail.component.css']
})
export class EventDetailComponent implements OnInit {

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  dayName:string;


  constructor(public dialogRef: MatDialogRef<EventDetailComponent>, @Inject(MAT_DIALOG_DATA) public event: CalendarEvent) 
  { 
    let day=moment(event.$day).day()
    let month=moment(event.$day).month()
    let hour=moment(event.$day).format("HH:MM")
    this.dayName=
    this.week[day]+
    ", "+moment(event.$day).format('DD')+
    ' de '+this.monthNames[month]+" " 
    +hour+" horas"
  }

  ngOnInit() 
  {
    console.log(this.dayName)
  }

}
