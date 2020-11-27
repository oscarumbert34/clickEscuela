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
  currentGrade: Grade;
  constructor(public dialogRef: MatDialogRef<PopupMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private gradesService: GradesService) 
  { 
    this.currentGrade=
    {
      student:'default',
      code:'',
      description: '',
      matter: '', 
      grade: 0
    }
    
  }

  addGrade()
  {
    
    this.gradesService.addGrade(this.currentGrade)
    console.log(this.gradesService.gradesList)
    this.dialogRef.close()
   // this.dialogRef.afterClosed().subscribe(res =>{alert("Se agrego una nueva nota")})
  }

  ngOnInit()
  {
  }

}
