import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
export interface Notification {
  type: string;
  tittle: string;
}
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  checked: boolean = false;
  @Output() messageEvent = new EventEmitter<boolean>();
  @Input() chat: Notification;
  @Input() homework: Notification;

  changeNotification() {
    this.checked = this.checked ? false : true;
    this.messageEvent.emit(this.checked);
  }

  notificationsHomework: Notification[] = [
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
  notificationsChat: Notification[] = [
    {
      type: 'Consulta Padre',
      tittle: 'Fechas de examen',
    },
    {
      type: 'Consulta Directivo',
      tittle: 'Fechas de examen',
    }
  ];
  constructor() { }

  ngOnInit() 
  {
  }

 

}
