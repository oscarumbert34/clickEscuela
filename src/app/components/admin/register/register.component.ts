import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('drawer', { static: true }) sidenav: MatSidenav;
  blockDinamicActually = 'parent-asistance';
  showHomeButton = false;



  constructor() { }

  ngOnInit() 
  {
    this.sidenav.open()
  }

  changeBlock(newBlock: string) {
    console.log(this.showHomeButton);
    this.showHomeButton = newBlock != 'home' ? true : false;
    this.blockDinamicActually = newBlock;
    console.log(newBlock)
  }


}
