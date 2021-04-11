import { Student } from './../../../models/student';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditStudentComponent>, @Inject(MAT_DIALOG_DATA) public data: Student) { }

  ngOnInit() {
    console.log(this.data)
  }

}
