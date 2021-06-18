import { SnackBarService} from '../../../../services/snack-bar.service';
import { StudentI } from './../../../interfaces/student';
import { GeoRefService } from '../../../../services/geo-ref.service';
import { studentService } from '../../../../services/student.service';
import { StudentBaseModelComponent } from '../student-base-model/student-base-model.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
// import { Student } from 'src/app/models/student';
// import { Parent } from 'src/app/models/parent';
import { Province } from 'src/app/models/province';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  providers: [GeoRefService],
})
export class AddStudentComponent implements OnInit {

  secondParent: boolean;
  currentStudent: StudentI;
  schoolId = '10';


  typeIDs = ['DNI', 'CI', 'LE', 'LC'];
  provinces: Province[];
  districts: Province[];
  selectedProvince: string;
  normalizedDirections;

  sortByname = (a, b) => {
    if (a.nombre > b.nombre) { return 1; }
    if (a.nombre < b.nombre) { return -1; }
    return 0;
  }

  constructor(
    private snackBarService: SnackBarService,
    private matDialogRef: MatDialog,
    private studentsService: studentService,
    private geoRefService: GeoRefService
  ) {
    this.secondParent = false;
    this.resetStudentModel();
    this.provinces = [];
    this.selectedProvince = '06';
  }

  resetStudentModel() {
    this.currentStudent = {
      name: 'Martin',
      surname: 'Lopez',
      birthday: '1993-05-05',
      gender: 'MALE',
      document: '37984176',
      level: 'PREESCOLAR',
      grade: '3',
      school: 'Raggio',
      schoolId: this.schoolId,
      division: 'A',
      adress:
      {
        street: 'Buenos Aires',
        number: '200',
        locality: 'Buenos Aires'
      },
      cellPhone: '1567947913',
      email: 'nico@gmail.com ',
      parent: {
        name: 'Eduardo',
        surname: 'Gimenez',
        adress:
        {
          street: 'Buenos Aires',
          number: '200',
          locality: 'Buenos Aires'
        },
        cellPhone: '145748744',
        email: 'eduardo@gmail.com',
        gender: 'MALE',
        document: '22500771',
        birthday: '1845-05-05'

      }
    };
  }

  ngOnInit() {
    this.getAllProvinces();
    this.getAllDistricts(this.selectedProvince);
  }

  getAllProvinces() {
    this.geoRefService.getProvinces().subscribe((data) => {
      this.provinces = data.provincias.sort(this.sortByname);
    });
  }

  getNormalizedDirections(direction: string) {
    if (direction.length > 3) {
      this.geoRefService.normalizeDirection(direction).subscribe((data) => {
        this.normalizedDirections = data.direccionesNormalizadas;
      });
    }
  }

  getAllDistricts(id: string) {
    this.geoRefService.getDistricts(id).subscribe((data) => {
      if (id === '02') {
        data.municipios.push({ id: '222', nombre: 'Malvinas Argentinas' });
      }
      this.districts = data.municipios.sort(this.sortByname);
    });
  }

  addParent() {
    this.secondParent = !this.secondParent;
    this.secondParent
      ? this.snackBarService.showSnackBar('Se agrego un familiar','Aceptar', 'NORMAL')
      : this.snackBarService.showSnackBar('Se quito el familiar adicional','Aceptar', 'NORMAL');
  }

  addStudent() {
    console.log(this.currentStudent);
    this.studentsService.addStudentPost(this.currentStudent, this.schoolId).subscribe(
      data => {
        this.snackBarService.showSnackBar('El alumno se creo satisfactoriamente','Aceptar', 'SUCCES');
      },
      error => {
        this.snackBarService.showSnackBar(this.formatErrorMessage(error.status.toString()),'Aceptar', 'ERROR');
        console.log(error, 'hubo un error');
    }


    );
    this.resetStudentModel();
  }

  formatErrorMessage(status: string) {
    switch (status) {
      case '400':
        return 'El alumno ya existe en la base de datos';
    }
  }

  cancelAdd() {
    this.resetStudentModel();
    this.snackBarService.showSnackBar('Se limpiaron los formularios','Aceptar', 'NORMAL');
  }

  openStudentModelBase() {
    this.matDialogRef.open(StudentBaseModelComponent, {
      data: this.schoolId,
      height: '90vh',
      width: '100vw',
    });
  }


}
