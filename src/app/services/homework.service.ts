import { Homework } from '../models/homework';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  private homeworksList: Homework[];

  constructor() {
    this.homeworksList = [];
    this.homeworksList.push(new Homework("", "Evaluacion Lengua", "Evaluacion del mes de noviembre", new Date, "2A", "Lengua"))
    this.homeworksList.push(new Homework("", "Evaluacion Matematica", "Evaluacion del mes de noviembre", new Date, "2A", "Matematica"))
    this.homeworksList.push(new Homework("", "Evaluacion Geografia", "Evaluacion del mes de noviembre", new Date, "2A", "Geografia"))
    this.homeworksList.push(new Homework("", "Evaluacion Sociales", "Evaluacion del mes de noviembre", new Date, "2A", "Sociales"))
    this.homeworksList.push(new Homework("", "Evaluacion Historia", "Evaluacion del mes de noviembre", new Date, "2A", "Historia"))
  }

  addHomework(homework: Homework) {
    this.homeworkList.push(homework)
  }

  modifyHomework(index: number, homework: Homework) {
    this.homeworkList.splice(index, 1, homework)
    console.log(this.homeworkList)
  }
  deleteHomework(index) {
    this.homeworkList.splice(index, 1)
  }



  get homeworkList() {
    return this.homeworksList
  }

}
