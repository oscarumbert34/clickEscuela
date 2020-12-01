import { studentService } from './../../../services/student.service';
import { GradesService } from './../../../services/grades.service';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from 'src/app/models/Grade';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-popupMenu',
  templateUrl: './popupMenu.component.html',
  styleUrls: ['./popupMenu.component.scss']
})
export class PopupMenuComponent implements OnInit 
{
  currentGrade: Grade;
  studentsList: Student[];
  existData:boolean;
  constructor(public dialogRef: MatDialogRef<PopupMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private gradesService: GradesService,private studentsService: studentService) 
  { 
    if(data.grade === undefined)
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
    else{
      this.currentGrade=data.grade;
    }
    
    this.existData=!!data.grade;
  
    this.studentsList=[]

    
  }

  loadStudents(currentCourse)
  {
    console.log(currentCourse)
    this.studentsList=this.studentsService.studentsList.filter(a =>a.course==currentCourse);
    console.log(this.studentsList)
  }



  addGrade()
  {
    
    this.gradesService.addGrade(this.currentGrade)
    console.log(this.gradesService.gradesList)
    this.dialogRef.close()
   // this.dialogRef.afterClosed().subscribe(res =>{alert("Se agrego una nueva nota")})
  }

  modifyGrade()
  {
    
    this.gradesService.modifyGrade(this.data.index,this.data.grade)
    this.dialogRef.close()
  }
  

  ngOnInit()
  {
    console.log(this.data.grade)
  }

}
