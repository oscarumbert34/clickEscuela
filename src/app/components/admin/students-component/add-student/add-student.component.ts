import { GeoRefService } from "./../../../../services/geoRef.service";
import { studentService } from "../../../../services/student.service";
import { StudentBaseModelComponent } from "../student-base-model/student-base-model.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/student";
import { Parent } from "src/app/models/parent";
import { Province } from "src/app/models/province";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
  providers: [GeoRefService],
})
export class AddStudentComponent implements OnInit {

  secondParent: boolean;
  currentStudent: Student;
  parent_1: Parent;
  parent_2: Parent;
  typeIDs = ["DNI", "CI", "LE", "LC"];
  provinces: Province[];
  districts: Province[];
  selectedProvince: string;
  normalizedDirections;
  
  sortByname = (a, b) => {
    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;
    return 0;
  };

  constructor(
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialog,
    private studentsService: studentService,
    private geoRefService: GeoRefService
  ) {
    this.secondParent = false;
    this.resetStudentModel();
    this.provinces = [];
    this.selectedProvince = "06";
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

  ngOnInit() {
    this.getAllProvinces();
    this.getAllDistricts(this.selectedProvince);
  }

  getAllProvinces() {
    this.geoRefService.getProvinces().subscribe((data) => {
      this.provinces = data.provincias.sort(this.sortByname);
      console.log(this.provinces);
    });
  }

  getNormalizedDirections(direction: string) {
    if (direction.length > 3) {
      this.geoRefService.normalizeDirection(direction).subscribe((data) => {
        this.normalizedDirections = data.direccionesNormalizadas;
        console.log(this.normalizedDirections);
      });
    }
  }

  getAllDistricts(id: string) {
    this.geoRefService.getDistricts(id).subscribe((data) => {
      if (id === "02")
        data.municipios.push({ id: "222", nombre: "Malvinas Argentinas" });
      this.districts = data.municipios.sort(this.sortByname);
      console.log(this.districts);
    });
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
