import { AddCalendarEventComponent } from './../add-calendar-event/add-calendar-event.component';
import { element } from 'protractor';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventsService } from './../../../services/calendar-events.service';
import { SVG_CONST } from './../../../enums/svg-constants';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import moment from 'moment';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weeks: any[]

  @ViewChild("monthNum") monthNumberElement: ElementRef;
  @ViewChild("yearNumber") yearNumberElement: ElementRef;

  calendarType: number



  currentDate: Date;

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  monthNumber: any;
  monthName: any;
  yearName: any;

  week: any =
    [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo"
    ];




  monthSelect: any[];
  dateSelect: any;
  dateValue: any;

  innerWidth: any;


  currentDay: string;



  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private calendarService: CalendarEventsService, private dialog: MatDialog) {

    iconRegistry.addSvgIconLiteral('leftSvg', sanitizer.bypassSecurityTrustHtml(SVG_CONST.LEFT_ARROW))
    iconRegistry.addSvgIconLiteral('rightSvg', sanitizer.bypassSecurityTrustHtml(SVG_CONST.RIGHT_ARROW))
    this.currentDate = new Date()

    this.innerWidth = window.innerWidth
    this.calendarType = 2

    this.currentDay = moment(this.currentDate).format("DD/MM/yyyy")

    console.log(this.currentDay)




  }

  selectType(num: number) {
    console.log(num)
    this.calendarType = num
  }



  ngOnInit() {


    this.getDaysFromDate(this.currentDate.getMonth() + 1, this.currentDate.getFullYear())


  }
  getPrevMonth() {
    const prevDate = this.dateSelect.clone().subtract(1, "month").format("MM");
    return this.monthNames[parseInt(prevDate)]


  }

  getNextMonth() {
    const nextDate = this.dateSelect.clone().add(1, "month").format("MM");
    return this.monthNames[parseInt(nextDate)]

  }

  geyDaysFromWeek() {



  }

  getDaysFromDate(month, year) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;


    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        completeDate: dayObject.format("DD/MM/yyyy"),
        dayObject: dayObject,
        events: this.calendarService.eventsList.filter(c => moment(c.$day).isSame(dayObject, "day"))
      };
    });

    this.monthSelect = arrayDays;


    var m = this.dateSelect.format("MM");
    this.monthName = this.monthNames[parseInt(m) - 1]
    this.monthNumber = m;

    var y = this.dateSelect.clone().subtract(1, "month").format("YYYY");
    this.yearName = y;
  }

  changeMonth(flag) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }

  showEvent(element: Element, event: Event) {

    let leftDialog = 0

    let elementRect = element.getBoundingClientRect()

    let viewportWidth = window.innerWidth;
    let leftSpace = elementRect.left
    let elementWidth = elementRect.width;


    let rightSpace = viewportWidth - elementWidth - leftSpace;



    if (rightSpace < leftSpace)
      leftDialog = (elementRect.left - 5 - 300) / viewportWidth * 100;
    else
      leftDialog = (element.clientWidth + elementRect.left + 5) / viewportWidth * 100;

    let topDialog = elementRect.top / 2;
    let topDialogaux = topDialog + 450


    if (topDialogaux > window.innerHeight) {

      topDialog = window.innerHeight - 450 - 20

    }





    const dialogRef = this.dialog.open(EventDetailComponent,
      {
        data: event,
        width: '300px',
        height: '450px',
        panelClass: "contact-info-back",
        position: { top: topDialog + 'px', left: leftDialog + '%' }
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) { console.log("finish") }
    });
  }

  addEvent(element: Element, event: Event) {

    let leftDialog = 0

    let elementRect = element.getBoundingClientRect()

    let viewportWidth = window.innerWidth;
    let leftSpace = elementRect.left
    let elementWidth = elementRect.width;


    let rightSpace = viewportWidth - elementWidth - leftSpace;



    if (rightSpace < leftSpace)
      leftDialog = (elementRect.left - 5 - 300) / viewportWidth * 100;
    else
      leftDialog = (element.clientWidth + elementRect.left + 5) / viewportWidth * 100;

    let topDialog = elementRect.top / 2;
    let topDialogaux = topDialog + 450


    if (topDialogaux > window.innerHeight) {

      topDialog = window.innerHeight - 450 - 20

    }





    const dialogRef = this.dialog.open(AddCalendarEventComponent,
      {
        data: event,
        width: '300px',
        height: '450px',
        panelClass: "contact-info-back",
        position: { top: topDialog + 'px', left: leftDialog + '%' }
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDaysFromDate(this.currentDate.getMonth() + 1, this.currentDate.getFullYear())

      }
    });
  }

}


