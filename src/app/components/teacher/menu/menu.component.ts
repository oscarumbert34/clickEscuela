import { NotificationComponent } from './../../commons/notification/notification.component';
import { element } from 'protractor';
import { Component, OnInit, Input, Directive, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Student } from 'src/app/models/student';
import { MatSidenav } from '@angular/material/sidenav';
import { Notification } from '../../interfaces/Notification';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('changeDisplay', [
      state('notifications-hide', style({
        display: 'none'
      })),
      state('notifications-show', style({
        display: 'block'
      })),
      transition('notifications-hide=>notifications-show', animate('4500ms')),
      transition('notifications-show=>notifications-hide', animate('4000ms'))
    ]),
  ]
})
@Directive({ selector: '[debounce]' })
export class MenuComponent implements OnInit {
  showFiller = true;
  notificationShow = false;
  notificationsDisplay = 'col-2 notifications-show';
  dinamicDisplay  = 'col-10';
  notificationChild = false;
  dashboard = 'Cant. Aprobados';
  checked  = false;
  classMenu  ='menu';
  blockDinamicActually = 'home';
  sidenavClass = 'sidenav-open';
  showHomeButton=false;

  currentNotification: Notification;
  isNotification: boolean;

  @ViewChild('drawer',{ static: true }) sidenav: MatSidenav;
  @ViewChild('menuNav',{static:true}) menuNav : ElementRef;
  @Input() delay = 300;

  constructor() { }

  ngOnInit() {
    this.sidenav.open()
  }

  changedDisplayNotification()
  {
    this.notificationShow = this.notificationShow ? false : true;
    this.dinamicDisplay = this.notificationShow ? 'col-9' : 'col-10';
  
  }


  hideNotificaction(){
    if(!this.notificationChild)
    {
      debounceTime(3000);
      this.notificationShow = false;
      this.dinamicDisplay = 'col-10';    

    }




  }
  receiveChange($event) {
    this.notificationChild = $event;
  }

  receiveNotification($event)
  {
    this.currentNotification=$event;
    this.isNotification=true;
    
    if ($event.type=="Tarea")
    {
    this.changeBlock("homework")
    }
    else{
      this.changeBlock("grade")
    }
    
    
  }
 
  changeBlock(newBlock: string)
  {
    console.log(this.showHomeButton)
    if (newBlock!='home')
    {
      this.showHomeButton=true;
     
    }
    else{
      this.showHomeButton=false;
    }
    this.blockDinamicActually = newBlock;
    console.log(newBlock)
  }

  notNotification()
  {
    this.isNotification=false;
  }

  

}
