import { GradesService } from './../../../services/grades.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Grade } from 'src/app/models/Grade';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  gradesArray: Grade[] = new Array(5);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  gradesList: Grade[];
  
  constructor(gradeService: GradesService) 
  { 
    this.gradesList=new Array();
    this.gradesList=gradeService.gradesList
    
  }

  ngOnInit() 
  {

    this.displayedColumns = ['student', 'code', 'description', 'matter', 'grade'];

    console.log(this.gradesList)
 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.gradesList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
