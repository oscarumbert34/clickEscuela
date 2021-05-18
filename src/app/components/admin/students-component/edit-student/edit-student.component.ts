import { studentService } from "../../../../services/student.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Student } from "../../../../models/student";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.scss"],
})
export class EditStudentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private studentsService: studentService
  ) {}

  secondParent: boolean;

  ngOnInit() {
    console.log(this.data);
    this.secondParent = false;
  }

  addParent() {
    this.secondParent = !this.secondParent;
    this.secondParent
      ? this.showSnackBar("Se agrego un familiar")
      : this.showSnackBar("Se quito el familiar adicional");
  }

  onClose() {
    this.dialogRef.close();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Aceptar", { duration: 5500 });
  }

  editStudent(index) {
    this.studentsService.edit(index, this.data.student);
    this.onClose();
    this.showSnackBar("Se edito la entrada");
  }
}
