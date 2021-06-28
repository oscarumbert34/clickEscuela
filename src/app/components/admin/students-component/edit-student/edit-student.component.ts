import { SnackBarService } from './../../../../services/snack-bar.service';
import { MESSAGES } from './../../../../enums/messages-constants';
import { studentService } from '../../../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../../../../models/student';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsService: studentService,
    private snackbarService: SnackBarService
  ) {}

  secondParent: boolean;

  ngOnInit() {
    console.log(this.data);
    this.secondParent = false;
  }

  addParent() {
    this.secondParent = !this.secondParent;
    this.secondParent
      ? this.snackbarService.showSnackBar(MESSAGES.PARENT.SUCCES, 'Aceptar', 'SUCCES')
      : this.snackbarService.showSnackBar(MESSAGES.PARENT.NORMAL, 'Aceptar', 'NORMAL');
  }

  onClose() {
    this.dialogRef.close();
  }



  editStudent() {
    this.data.student.schoolId = this.data.schoolId;
    this.studentsService.editStudentPut(this.data.student, this.data.schoolId).subscribe(
      data => {
        console.log(data);
        this.snackbarService.showSnackBar(MESSAGES.STUDENT.PUT.SUCCES, 'Aceptar', 'SUCCES');
      },
      error => {
        console.log(error);
        this.snackbarService.showSnackBar(MESSAGES.STUDENT.PUT.ERROR, 'Aceptar', 'ERROR');
      }
    );
  }
}
