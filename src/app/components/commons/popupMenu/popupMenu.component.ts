import { GradesService } from './../../../services/grades.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from 'src/app/models/Grade';

@Component({
  selector: 'app-popupMenu',
  templateUrl: './popupMenu.component.html',
  styleUrls: ['./popupMenu.component.scss']
})
export class PopupMenuComponent implements OnInit 
{
  constructor(public dialogRef: MatDialogRef<PopupMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private gradesService: GradesService) 
  { 
    
  }

  addGrade()
  {
    let grade= new Grade("Juana Almiron","T00001","Historia Europea","Historia",10);
    this.gradesService.addGrade(grade)
    console.log(this.gradesService.gradesList)
  }

  ngOnInit()
  {
  }

}
