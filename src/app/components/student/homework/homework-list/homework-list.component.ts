
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

  constructor(private homeworkService: HomeworkService, public dialog: MatDialog) {
    this.homeworkList = this.homeworkService.homeworkList
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

}
