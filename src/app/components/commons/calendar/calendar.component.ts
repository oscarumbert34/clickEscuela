import { SVG_CONST } from './../../../enums/svg-constants';
import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weeks: any[]

  @ViewChildren('day') calendarDays: QueryList<ElementRef>
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.weeks = []

    let count = 1;

    for (let i = 1; i <= 6; i++) {
      let week = []
      for (let j = 1; j <= 7; j++) {
        week.push("day" + count);
        count++
      }
      this.weeks.push(week)
    }

    console.log(this.weeks)

    
     iconRegistry.addSvgIconLiteral('leftSvg', sanitizer.bypassSecurityTrustHtml(SVG_CONST.LEFT_ARROW))
     iconRegistry.addSvgIconLiteral('rightSvg', sanitizer.bypassSecurityTrustHtml(SVG_CONST.RIGHT_ARROW))

  }



  ngOnInit() {


  }

  ngAfterViewInit() {
    console.log(this.calendarDays)
    this.fillCalendar(0, 0)
    document.getElementById("day8").innerHTML == "Hola"
  }


  fillCalendar(anio, mes) {


    
    var displacementdays = [0, 1, 2, 3, 4, 5, 6];

    var currentDate;
    if (mes == 0 && anio == 0) {
      currentDate = new Date();
    } else {
      currentDate = new Date(anio, mes, 1);
    }

    console.log(currentDate)


    var monthLegend = this.monthNames[currentDate.getMonth()];

    document.getElementById("monthLegend").innerHTML = monthLegend;
    document.getElementById("yearLegend").innerHTML = currentDate.getFullYear();

    var numberMonth = document.getElementById("monthNumber");
    var currentMonth = (currentDate.getMonth() + 1) + "";



    var large = currentMonth.length;

    var day = ("0" + currentDate.getDate()).slice(-2)
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
    var year = currentDate.getFullYear();

    numberMonth.innerHTML = month;

    var firstDay = new Date((currentDate.getMonth() + 1) + ' ' + '01' + ', ' + currentDate.getFullYear() + ' 12:00:00');



    var displace = displacementdays[firstDay.getUTCDay()];
    console.log(displace)

    for (var i = 1; i <= 42; i++) {
      var celd = document.getElementById("numberday" + i)
      celd.innerHTML = "";
    }

    var dia = 1;
    var totaldays = this.daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    for (var i = displace + 1; i <= totaldays + displace; i++) {
      let id = 'numberday' + i
      document.getElementById(id).innerHTML =dia+""
       
      dia++;
    }
  }


  daysInMonth(mes, año) {
    return new Date(año, mes, 0).getDate();
  }

  getNextMonth(){
    var month = parseInt(document.getElementById("monthNumber").innerHTML) - 1;
    if (month == 11) {
      month = 0;
    }
    else {
      month++;
    }

   

    return this.monthNames[month]
  }

  getPrevMonth(){
    var month = parseInt(document.getElementById("monthNumber").innerHTML) - 1;

    if (month == 0) {
      month = 11;
    }
    else {
      month--;
    }
   

    return this.monthNames[month]
  }




  prevMonth() {
    var month = parseInt(document.getElementById("monthNumber").innerHTML) - 1;
    var year = parseInt(document.getElementById("yearLegend").innerHTML);

    if (month == 0) {
      month = 11;
      year--
    }
    else {
      month--;
    }

    this.fillCalendar(year, month);
    // for (var i = 1; i <= 37; i++) {
    //   document.getElementById("dia" + i).style.fill = "black"
    //   document.getElementById("dia" + i).style.fontSize = "41.4646px"
    // }



  }

  nextMonth() {
    var month = parseInt(document.getElementById("monthNumber").innerHTML) - 1;
    var year = parseInt(document.getElementById("yearLegend").innerHTML);

    if (month == 11) {
      month = 0;
      year++
    }
    else {
      month++;
    }

    this.fillCalendar(year, month);

    // for (var i = 1; i <= 37; i++) {
    //   document.getElementById("dia" + i).style.fill = "black"
    //   document.getElementById("dia" + i).style.fontSize = "41.4646px"
    // }
  }



}
