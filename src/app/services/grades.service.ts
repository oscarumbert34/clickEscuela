import { Injectable } from '@angular/core';
import { Grade } from '../components/interfaces/Grade';

@Injectable({
  providedIn: 'root'
})
export class GradesService 
{

  private grades: Grade[];

constructor() 
{ 
  this.grades=[
    {
      student:
      {
        surname:"Gomes",
        name:"Javier Mario"
      },
      code:"T000001",
      description:"Evaluacion 1. Sumas y restas, separacion de terminos",
      matter: "Matematicas",
      grade: 10
    }
    ,
    {
      student:
      {
        surname:"Flores",
        name:"Tanina Lorena"
      },
      code:"T000001",
      description:"Evaluacion 1. Sumas y restas, separacion de terminos",
      matter: "Matematicas",
      grade: 8
    },
    {
      student:
      {
        surname:"Santos",
        name:"Fatima Eleonor"
      },
      code:"T000001",
      description:"Evaluacion 1. Sumas y restas, separacion de terminos",
      matter: "Matematicas",
      grade: 6
    },
    {
      student:
      {
        surname:"Juarez",
        name:"Maria Ayelen"
      },
      code:"T000001",
      description:"Evaluacion 1. Sumas y restas, separacion de terminos",
      matter: "Matematicas",
      grade: 4
    }
  ]
}

get gradesList(){
  return this.grades;
}

}
