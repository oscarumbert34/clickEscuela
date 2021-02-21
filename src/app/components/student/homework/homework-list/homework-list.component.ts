
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HomeworkService } from 'src/app/services/homework.service';

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.scss']
})
export class HomeworkListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  homeworkList = [];

  presentsList: boolean[];

  takeAsistance: boolean;

  currentFile: string;

  loadIndex: number[];
  completeIndex: number[];
  loadAnimation: number[];

  indexedMap = new Map();
  progressPercentajeList: number[];
  progressPercentaje: number;
  isFinalyload: boolean[];

  constructor(private homeworkService: HomeworkService, public dialog: MatDialog) {
    this.homeworkList = this.homeworkService.homeworkList

    
    this.currentFile = "";
    this.loadIndex = [];
    this.loadAnimation = []
    this.progressPercentaje = 0;
    this.progressPercentajeList = [];
    this.isFinalyload = []
    for (let asis of this.homeworkList) {
      this.progressPercentajeList.push(0)
      this.isFinalyload.push(true)
    }
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'deliveryDate', 'matter', 'actions'];


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.homeworkList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.homeworkList)

  }

  refreshTable() {
    console.log("Refresh exitoso")
    this.dataSource.data = this.homeworkList;
  }


  applyFilter(event: Event) {
    console.log((event.target as HTMLInputElement).value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  progressLoad(index) {
    this.progressPercentaje = 0;


    const inter = setInterval(() => {
      this.progressPercentajeList[index] += Math.floor(Math.random() * (30 - 0)) + 0;;
      this.isFinalyload[index] = this.progressPercentajeList[index] < 100;
      console.log(this.progressPercentajeList[index] + '  ' + this.isFinalyload)

      if (this.progressPercentajeList[index] > 100) {
        clearInterval(inter)

      }
    }, 2000)


  }

  getPercentaje(index) {
    console.log(this.progressPercentajeList[index])
    return this.progressPercentajeList[index]
  }

  getFinaly(index) {

    return this.isFinalyload[index]
  }


  viewFileName(index) {

    return this.indexedMap.get(index).files[0].name
  }

  loadFile(index) {
    this.loadIndex.splice(index, 1)
    this.loadAnimation.push(index)
    console.log(this.loadIndex)

  }

  viewFileList(index, ele) {
    this.loadIndex.push(index)

    this.indexedMap.set(index, ele)
    console.log(this.loadIndex)


  }

   clearInputFile(index) 
   {
    this.loadIndex.splice(index,1)

    this.indexedMap.delete(index)
    


  }





}
