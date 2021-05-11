import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eventDetail',
  templateUrl: './eventDetail.component.html',
  styleUrls: ['./eventDetail.component.css']
})
export class EventDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() 
  {
    console.log(this.data)
  }

}
