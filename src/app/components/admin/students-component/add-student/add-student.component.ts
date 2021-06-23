import { MESSAGES } from './../../../../enums/messages-constants';
import { SnackBarService} from '../../../../services/snack-bar.service';
import { StudentI } from './../../../interfaces/student';
import { GeoRefService } from '../../../../services/geo-ref.service';
import { studentService } from '../../../../services/student.service';
import { StudentBaseModelComponent } from '../student-base-model/student-base-model.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Province } from 'src/app/models/province';
import { MODEL } from 'src/app/enums/ng-models';

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
    this.currentStudent = MODEL.CURRENT_STUDENT;
    this.currentStudent.schoolId = this.schoolId;
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
      ? this.snackBarService.showSnackBar(MESSAGES.PARENT.SUCCES, 'Aceptar', 'SUCCES')
      : this.snackBarService.showSnackBar(MESSAGES.PARENT.NORMAL, 'Aceptar', 'NORMAL');
  }

  addStudent() {
    console.log(this.currentStudent);
    this.studentsService.addStudentPost(this.currentStudent, this.schoolId).subscribe(
      data => {
        this.snackBarService.showSnackBar(MESSAGES.STUDENT.POST.SUCCES, 'Aceptar', 'SUCCES');
      },
      error => {
        this.snackBarService.showSnackBar(MESSAGES.STUDENT.POST.ERROR[error.status], 'Aceptar', 'ERROR');
        console.log(error, 'hubo un error');
    }


    );
    this.resetStudentModel();
  }


  cancelAdd() {
    this.resetStudentModel();
    this.snackBarService.showSnackBar(MESSAGES.CLEAR_FORMS, 'Aceptar', 'NORMAL');
  }

  openStudentModelBase() {
    this.matDialogRef.open(StudentBaseModelComponent, {
      data: this.schoolId,
      height: '90vh',
      width: '100vw',
    });
  }


}
