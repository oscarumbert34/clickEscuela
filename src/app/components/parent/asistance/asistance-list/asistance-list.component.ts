import { element } from 'protractor';
import { AsistanceParent } from './../../../../models/AsistanceParent';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Asistance } from 'src/app/models/Asistance';
import { MatTableDataSource } from '@angular/material/table';
import { AsistanceParentService } from 'src/app/services/asistance-parent.service';

@Component({
  selector: 'app-asistance-list',
  templateUrl: './asistance-list.component.html',
  styleUrls: ['./asistance-list.component.scss']
})
export class AsistanceListComponent implements OnInit 
{

  displayedColumns: string[];
  dataSource: any;
  currentDate= new Date()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  asistanceList: AsistanceParent[];
  presentsList: boolean[];

  takeAsistance:boolean;

  currentFile:string;

  loadIndex:number[];
  loadAnimation:number[];

  indexedMap=new Map();


  


  constructor(private asistanceService: AsistanceParentService) 
  {
    this.asistanceList=[]
    this.asistanceList=asistanceService.asistanceList
    this.currentFile="";
    this.loadIndex=[];
    this.loadAnimation=[]

  }

  viewFileName(index)
  {
  
    return this.indexedMap.get(index).files[0].name
  }

  loadFile(index)
  {
    this.loadIndex.splice(index,1)
    this.loadAnimation.push(index)
    console.log(this.loadIndex)
  
  }

  

  ngOnInit()
   {
    this.displayedColumns = ['name','status', 'date', 'certificate'];

 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.asistanceList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  

  viewFileList(index,ele)
  {
    this.loadIndex.push(index)
    
    this.indexedMap.set(index,ele)
    console.log(this.loadIndex)
   

  }

  refreshTable()
  {
    console.log("Refresh exitoso")
    this.dataSource.data = this.asistanceService.asistanceList
  }


  applyFilter(event: Event)
   {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  


}