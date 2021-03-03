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
}

get groupsList(){
  return this.workgroupList
}

}
