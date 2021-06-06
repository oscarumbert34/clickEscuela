import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

teachersList:Teacher[]
constructor() 
{
  this.teachersList=[];
  this.teacherList.push(new Teacher("Raul","Perez Sanchez",new Date(),"20220215","DNI","San Martin de Tours 24","1568787459","rperezprofe@gmail.com",["1A","1B"]))
  this.teacherList.push(new Teacher("Marta","Lopez",new Date(),"15454878","DNI","Lorenzini 114","1568787459","malopez@gmail.com",["1A"]))
  this.teacherList.push(new Teacher("Miriam","Soria",new Date(),"20477878","DNI","Balbin 244","11548787547","miriamsoria@gmail.com",["1A"]))
}

get teacherList()
{
  return this.teachersList;
}

addTeacher(teacher:Teacher)
{
  this.teachersList.push(teacher)
}

deleteTeacher(index){
  this.teacherList.splice(index,1)
}

editTeacher(index:number,teacher:Teacher){
  this.teacherList.splice(index,1,teacher)
}

}
