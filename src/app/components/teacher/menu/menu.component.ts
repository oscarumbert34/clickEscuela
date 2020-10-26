import { Component, OnInit, Input, Directive, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Student } from 'src/app/models/student';
import { MatSidenav } from '@angular/material/sidenav';

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
  sidenavClass = 'sidenav';
  @ViewChild('drawer',{ static: true }) sidenav: MatSidenav;
  @Input() delay = 300;

  constructor() { }

  ngOnInit() {

  }

  changedDisplayNotification(){
    this.notificationShow = this.notificationShow ? false : true;
    this.dinamicDisplay = this.notificationShow ? 'col-9' : 'col-10';
  }
  hideNotificaction(){
    if(!this.notificationChild){
      debounceTime(3000);
      this.notificationShow = false;
      this.dinamicDisplay = 'col-10';
    }

  }
  receiveChange($event) {
    this.notificationChild = $event;
  }
  changeVisibilityMenu() {
    this.checked = this.checked ? false : true;
  }
  showMenu(){
    this.sidenavClass = 'sidenav-open';
    this.sidenav.open();
  }
  changeClassMenu(){
    if(!this.checked){
      this.sidenavClass = 'sidenav';
      this.sidenav.close();

    }
  }
  changeBlock(newBlock: string){
    this.blockDinamicActually = newBlock;
  }

}
