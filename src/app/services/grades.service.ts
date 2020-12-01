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
  console.log(this.studentsArray)

  this.grades.push(new Grade("Alberto Sanchez","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",10));
  this.grades[1] = new Grade("MArgarita Lopez","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",8);
  this.grades[2] = new Grade("Juan Aldana","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",9);
  this.grades[3] = new Grade("Monica Vera","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",4);
  this.grades[4] = new Grade("Edith Kron","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",6);
  this.grades[5] = new Grade("Aldo Mines","T00001","Evaluacion 1. Sumas y restas, separación de términos","Matemáticas",7);

}

addGrade(grade: Grade)
{
  this.grades.push(grade)
}

deleteGrade(index)
{
  this.grades.splice(index,1)
}

modifyGrade(index,grade:Grade)
{
  this.grades.splice(index,1,grade)
}



get gradesList(){
  return this.grades;
}

}
