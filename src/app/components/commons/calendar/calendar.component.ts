import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weeks: any[]

  @ViewChildren('day') calendarDays: QueryList<ElementRef>

  constructor() {
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
  }



  ngOnInit() {


  }

  ngAfterViewInit() {
    console.log(this.calendarDays)
    this.fillCalendar(0, 0)
    document.getElementById("day8").innerHTML == "Hola"
  }


  fillCalendar(anio, mes) {


    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var displacementdays = [0, 1, 2, 3, 4, 5, 6];

    var currentDate;
    if (mes == 0 && anio == 0) {
      currentDate = new Date();
    } else {
      currentDate = new Date(anio, mes, 1);
    }

    console.log(currentDate)


    var monthLegend = monthNames[currentDate.getMonth()];

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
