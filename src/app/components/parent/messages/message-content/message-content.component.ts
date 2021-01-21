import { MessagesService } from './../../../../services/messages.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {

  messageList:Message[];
  displayedColumns: string[];
  dataSource: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private messageService: MessagesService)
  {
    this.messageList=this.messageService.messageList
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

}
