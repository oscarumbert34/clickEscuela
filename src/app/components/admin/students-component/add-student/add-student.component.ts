import { ProvinceService } from './../../../../services/province.service';
import { studentService } from "../../../../services/student.service";
import { StudentsComponent } from "../../../teacher/students/students.component";
import { StudentBaseModelComponent } from "../student-base-model/student-base-model.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/student";
import { Parent } from "src/app/models/Parent";
import { Province } from 'src/app/models/Province';

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
  providers:[ProvinceService]
})
export class AddStudentComponent implements OnInit {
  secondParent: boolean;
  currentStudent: Student;
  parent_1: Parent;
  parent_2: Parent;
  typeIDs = ["DNI", "CI", "LE", "LC"];
  provinces:Province[];

  constructor(
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialog,
    private studentsService: studentService,
    private provinceService:ProvinceService
  ) {
    this.secondParent = false;
    this.resetStudentModel();
    this.provinces=[]
  }

  resetStudentModel() {
    this.currentStudent = {
      id: "",
      name: "",
      surname: "",
      bornDate: undefined,
      absences: 0,
      observation: "",
      course: "",
      idNumber: null,
      adress: "",
      telephone: "",
      email: "",
      parent1: {
        id: "",
        name: "",
        surname: "",
        bornDate: undefined,
        idNumber: null,
        adress: "",
        telephone: "",
        email: "",
      },
      parent2: {
        id: "",
        name: "",
        surname: "",
        bornDate: undefined,
        idNumber: null,
        adress: "",
        telephone: "",
        email: "",
      },
    };


  }

  ngOnInit()
  {
    this.getAllProvinces()
  }

  getAllProvinces(){
    this.provinceService.getProvinces().subscribe(data=>
      {
        this.provinces=data
        console.log(this.provinces)
      })
  }
  
  

  addParent() {
    this.secondParent = !this.secondParent;
    this.secondParent
      ? this.showSnackBar("Se agrego un familiar")
      : this.showSnackBar("Se quito el familiar adicional");
  }

  addStudent() {
    this.studentsService.addStudent(this.currentStudent);
    this.resetStudentModel();
    this.showSnackBar("Se creo el nuevo alumno");
  }

  cancelAdd() {
    this.resetStudentModel();
    this.showSnackBar("Se limpiaron los formularios");
  }

  openStudentModelBase() {
    this.matDialogRef.open(StudentBaseModelComponent, {
      height: "90vh",
      width: "100vw",
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Aceptar", { duration: 5500 });
  }
}
