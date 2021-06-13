import { studentService } from '../../../../services/student.service';
import { GradesService } from '../../../../services/grades.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from 'src/app/models/grade';
import { Student } from 'src/app/models/student';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss'],
})
export class AddGradeComponent implements OnInit {
  currentGrade: Grade;
  studentsList: Student[];
  existData: boolean;
  localData: any;
  @ViewChild('course') course: MatSelect;

  courses = ['3B', '2A'];
  matters = [
    'Historia',
    'Geografia',
    'Matemáticas',
    'Ciencias Sociales',
    'Ingles',
    'Lengua',
    'Quimica',
  ];
  homeworks =
  [
    {
      code: 'T00001',
      name: 'Evaluacion 2'
    },
    {
      code: 'T00002',
      name: 'Tarea Pagina 32'
    },
    {
      code: 'T00003',
      name: 'Tarea Recreativa'
    }
  ];

  selectedCourse = '';



  constructor(
    public dialogRef: MatDialogRef<AddGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gradesService: GradesService,
    private studentsService: studentService
  ) {
    if (data.grade === undefined) {
      this.currentGrade = {
        student: 'default',
        code: '',
        description: '',
        matter: '',
        grade: 0,
        course: '5B'
      };
      this.localData = {
        grade: {
          student: '',
          code: '',
          description: '',
          matter: '',
          grade: 0,
          course: '6B'
        },
        index: 0,
      };
      this.existData = !!data.grade;
    } else {
      this.currentGrade = data.grade;
      this.localData = data;
    }

    this.existData = !!data.grade;

    this.studentsList = [];
  }

  loadStudents() {

    this.studentsList = this.studentsService.studentsList.filter(
      a => a.course === this.selectedCourse
    );
    console.log(this.selectedCourse);
  }

  addGrade() {
    this.gradesService.addGrade(this.currentGrade);
    console.log(this.gradesService.gradesList);
    this.dialogRef.close();
  }

  modifyGrade() {
    if (this.currentGrade.student === '') {
      // tslint:disable-next-line: no-unused-expression
      this.currentGrade.student === this.data.student;
    }
    this.gradesService.modifyGrade(this.data.index, this.data.grade);
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data.grade);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
