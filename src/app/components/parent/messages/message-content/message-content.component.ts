import { element } from 'protractor';
import { style } from '@angular/animations';
import { MessagesService } from './../../../../services/messages.service';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit 
{
  colors: string[]
  selectedColor:string;
  messageList:Message[];
  displayedColumns: string[];
  dataSource: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('userAvatar') avatars: QueryList<HTMLDivElement>;


  root;

  
  constructor(private messageService: MessagesService)
  {
    this.messageList=this.messageService.messageList
    this.colors=['#049dd975','#14a6479c','#f2c84b7c','#f24e2975','#f2b9b37e'];
    this.selectedColor=this.randomColor()

    this.root=document.documentElement;
   
  }

  ngOnInit() 
  {

    this.displayedColumns = ['message'];

 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.messageList
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;



    
  }

  

  randomColor()
  {
    let num= Math.floor(Math.random() * (4 - 0)) + 0;
    return this.colors[num]

  }

  showChildrens()
  {
    this.avatars.forEach((element,index) =>
     console.log(element ) 

    // element.nativeElement
    


     )

  }

  setColor(i)
  {
    this.root.style.setProperty('--background-header',this.colors[i])
    
    
  }

  getColor(i)
  {
    
    return(this.colors[i])

  }


  

}
