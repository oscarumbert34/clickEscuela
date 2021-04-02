import { Comment } from '../models/Comment';
import { Injectable } from '@angular/core';
import { WorkGroup } from '../models/WorkGroup';


@Injectable({
  providedIn: 'root'
})
export class WorkGroupService {

workgroupList: WorkGroup[];
constructor() 
{
  this.workgroupList=[];
  this.workgroupList.push(new WorkGroup('TP Simbiosis',new Date("03/02/2021"),new Date("03/15/2021"),"TO_DO"))
  this.workgroupList.push(new WorkGroup('TP Fisica',new Date("03/02/2021"),new Date("03/15/2021"),"IN_PROGRESS"))
  this.workgroupList.push(new WorkGroup('TP Geografia',new Date("03/02/2021"),new Date("03/15/2021"),"TO_DO"))
  this.workgroupList.push(new WorkGroup('TP Ingles',new Date("03/02/2021"),new Date("03/15/2021"),"TO_DO"))

  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
  this.workgroupList[0].addConsign("Definir las bases de la simbiosis de los animales marinos")
}

get groupsList(){
  return this.workgroupList
}

addComment(index:number,sender: string, comment:string)
{
  let com= new Comment(sender,comment,new Date())
  this.workgroupList[index].addComment(com)
}
addHistory(index:number,sender: string, move:string)
{
  let com= new Comment(sender,move,new Date())
  this.workgroupList[index].addHistory(com)
}

deleteComment(index:number, commentNumber:number)
{
  this.workgroupList[index].deleteComment(commentNumber)
}

}
