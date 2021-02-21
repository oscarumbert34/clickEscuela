import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  tabs: string[];
  @Input() view;

  constructor() {
    
  }

  ngOnInit(): void 
  {
    console.log(this.view+' '+this.tabs)
    if (this.view=="student")
    {
      this.tabs = ["Mensajes"]
    }
    else{

      this.tabs = ["Mensajes", "Notificaciones"]
    }
  }

}
