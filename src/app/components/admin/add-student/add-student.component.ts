import { StudentsComponent } from './../../teacher/students/students.component';
import { StudentBaseModelComponent } from './../student-base-model/student-base-model.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  secondParent:boolean;

  constructor(private snackBar: MatSnackBar,private matDialogRef: MatDialog) 
  {
    this.secondParent=false;
   }

  ngOnInit() {
  }

  addParent()
  {
    this.secondParent=!this.secondParent
    this.secondParent ? this.showSnackBar("Se agrego un familiar") : this.showSnackBar("Se quito el familiar adicional")
  }

  openStudentModelBase(){
    this.matDialogRef.open(StudentBaseModelComponent,{
      height:"90vh",
      width: "100vw"
    })
  }

  showSnackBar(message:string)
  { 
    this.snackBar.open(message, "Aceptar" ,{duration:5500})
  }

}
