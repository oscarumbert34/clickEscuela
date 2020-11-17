import { studentService } from './student.service';
import { Student } from './../models/student';
import { Injectable } from '@angular/core';
import { Grade } from '../models/Grade';



@Injectable({
  providedIn: 'root'
})
export class GradesService 
{

  private grades: Grade[];
  private studentsArray: Student[];

constructor(studentService:studentService) 
{ 

  this.grades=[];
  this.studentsArray=studentService.studentsList;

  this.grades[0] = new Grade(this.studentsArray[0],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",10);
  this.grades[1] = new Grade(this.studentsArray[1],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",8);
  this.grades[2] = new Grade(this.studentsArray[2],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",9);
  this.grades[3] = new Grade(this.studentsArray[3],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",4);
  this.grades[4] = new Grade(this.studentsArray[4],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",6);
  this.grades[5] = new Grade(this.studentsArray[5],"T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",7);

}



get gradesList(){
  return this.grades;
}

}
