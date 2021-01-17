import { AsistanceService } from './../../../services/asistance.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Asistance } from 'src/app/models/Asistance';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-asistance-list',
  templateUrl: './asistance-list.component.html',
  styleUrls: ['./asistance-list.component.scss']
})
export class AsistanceListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  currentDate= new Date()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('picker') picker: MatDatepicker<Date>;


  asistanceList: Asistance[];
  presentsList: boolean[];

  takeAsistance:boolean;

  constructor(private asistanceService: AsistanceService) 
  {
    this.takeAsistance=false;
    this.asistanceList=[]
    this.asistanceList=asistanceService.asistancesList
    this.presentsList=new Array(this.asistanceList.length);
    for (let i=0;i<this.asistanceList.length;i++)
    {
      this.presentsList[i]=false;
    }

    this.currentDate.setHours(0)
    this.currentDate.setMinutes(0)
    this.currentDate.setSeconds(0)
    this.currentDate.setMilliseconds(0)



  }

  ngOnInit() 
  {

    this.displayedColumns = ['name', 'surname', 'date', 'status'];

 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.asistanceList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterByDate()
  {
    let asis=this.asistanceService.asistancesList.filter(a =>a.date.getTime()===this.picker.startAt.getTime() )
    this.asistanceList=asis;
    this.refreshTable()
    console.log(asis)
    console.log(this.asistanceList)

  }
  changeTakeAsistance()
  {
    this.takeAsistance=!this.takeAsistance;

    this.refreshTable()

  }

  

  changeStatus(index: number, status:boolean)
  {
    this.asistanceService.changeStatus(index,status);
    this.refreshTable()
  }

  refreshTable()
  {
    console.log("Refresh exitoso")
    this.dataSource.data = this.asistanceService.asistancesList
  }


  applyFilter(event: Event)
   {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setPresent(event:Event, index:number)
  {
   
    //this.presentsList[index]=event.currentTarget.checked;
  }

  savePresents()
  {
    for (let i=0;i<this.presentsList.length;i++)
    {
      let newasistance= new Asistance(this.asistanceList[i].name,this.asistanceList[i].surname,this.currentDate,this.presentsList[i])
      
      this.asistanceService.addAsistance(newasistance)
      
    }

    this.takeAsistance=false;
  }

}
