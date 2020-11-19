import { MatBadgeModule } from '@angular/material/badge';
import { Notification } from '../../interfaces/Notification';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  checked: boolean = false;
  notificationsHomework: Notification[];
  notificationsChat: Notification[];

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() openNotification=new EventEmitter<Notification>();
  @Output() notificationNumber=new EventEmitter<number>();


  changeNotification() {
    this.checked = this.checked ? false : true;
    this.messageEvent.emit(this.checked);
  }

  showNotification(notification:Notification){
    this.openNotification.emit(notification)
  }

  shownotificationsNumber()
  {
    this.notificationNumber.emit(this.notificationsHomework.length+this.notificationsChat.length);
  }


 
  constructor() 
  {  
     this.notificationsHomework= [
    {
      type: 'Tarea',
      tittle: 'La tarea de Ingles termino',
    },
    {
      type: 'Tarea',
      tittle: 'La tarea de Matematica termino',
    },
    {
      type: 'Tarea',
      tittle: 'La tarea de Geografia termino',
    }
  ]; 
  
  this.notificationsChat= [
    {
      type: 'Consulta Padre',
      tittle: 'Fechas de examen',
    },
    {
      type: 'Consulta Directivo',
      tittle: 'Fechas de examen',
  
    }
  ];
  this.shownotificationsNumber()

}

ngOnInit() 
{
  this.shownotificationsNumber()
  }

}
