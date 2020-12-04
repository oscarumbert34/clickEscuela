import { HomeworkListComponent } from './../homework-list/homework-list.component';
import { Input, QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHomeworkComponent } from '../../commons/add-Homework/add-Homework.component';
import { Notification } from '../../interfaces/Notification';


@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit 
{

  @Input() currentNotification: Notification;
  @Input() isNotification: boolean;
  @ViewChildren(HomeworkListComponent) homeworkList: QueryList<HomeworkListComponent>;


  constructor(public dialog: MatDialog) 
  { 
  
  }

  openDialog(input)
  {
   const dialogRef=this.dialog.open(AddHomeworkComponent,
    {data: input,
    width: '80%',
    height:'75%'}
    )

   dialogRef.afterClosed().subscribe(res =>{this.refreshAllChildrens()})
   
  }

  refreshAllChildrens()
  {
    for (let comp of this.homeworkList)
    {
      comp.refreshTable()
    }
    
  }
  

  ngOnInit() {
  }



}
