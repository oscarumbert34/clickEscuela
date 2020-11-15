import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../../interfaces/Notification';


@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit 
{

  @Input() currentNotification: Notification;
  @Input() isNotification: boolean;

  constructor() { 
  
  }

  

  ngOnInit() {
  }



}
