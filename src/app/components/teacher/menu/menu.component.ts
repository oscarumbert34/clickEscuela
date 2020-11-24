import { Component, OnInit, Input, Directive, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Student } from 'src/app/models/student';
import { MatSidenav } from '@angular/material/sidenav';
import { HomeComponent } from '../home/home.component';
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
  dinamicDisplay  = 'col-10 size-display-dinamic';
  notificationChild = false;
  dashboard = 'Cant. Aprobados';
  checked  = false;
  classMenu  = 'menu';
  blockDinamicActually = 'home';
  sidenavClass = 'sidenav-open';
  showHomeButton = false;

  currentNotification: Notification;
  isNotification: boolean;
  numberNotifications: number;

  @ViewChild('drawer', { static: true }) sidenav: MatSidenav;
  @ViewChild(HomeComponent) home: HomeComponent;
  @ViewChild('menuNav', {static: true}) menuNav: ElementRef;
  @Input() delay = 300;

  constructor() { }

  theEvent$;

  changedDisplayNotification()
  {
    this.notificationShow = this.notificationShow ? false : true;
    if( this.notificationShow){
      this.dinamicDisplay = 'col-9';
      this.home.changeSizeDashboard(true);
    }else{
      this.dinamicDisplay = 'col-10 size-display-dinamic';
      this.home.changeSizeDashboard(false);
    }
   // this.dinamicDisplay = this.notificationShow ? 'col-9' : 'col-10 size-display-dinamic';
  }


  hideNotificaction(){
    if(!this.notificationChild){

      this.notificationShow = false;
      this.dinamicDisplay = 'col-10 size-display-dinamic';
      //this.home.changeSizeDashboard(false);

    }
  }
  receiveChange($event) {
    this.notificationChild = $event;
  }

  receiveNotificationsNumber($event){
    this.numberNotifications=$event;
  }

  receiveNotification($event)
  {
    this.currentNotification = $event;
    this.isNotification=true;
    this.changeBlock($event.type == 'Tarea' ? 'homework' : 'grade');

    // if ($event.type == "Tarea")
    // {
    // this.changeBlock("homework")
    // }else{
    //   this.changeBlock("grade")
    // }

  }
 
  changeBlock(newBlock: string)
  {
    console.log(this.showHomeButton);
    this.showHomeButton = newBlock != 'home' ? true : false;

    // if (newBlock!='home')
    // {
    //   this.showHomeButton=true;

    // }
    // else{
    //   this.showHomeButton=false;
    // }
    this.blockDinamicActually = newBlock;
    console.log(newBlock)
  }

  notNotification()
  {
    this.isNotification = false;
  }

   ngOnInit() {
    this.sidenav.open();

  }

}
