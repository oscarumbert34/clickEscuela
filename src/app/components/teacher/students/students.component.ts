import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Student } from "src/app/models/student";
import { dataStudents } from "./students";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  studentsArray: Student[] = new Array(5);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor() {}
  ngOnInit(): void {
    this.displayedColumns = [
   
      "name",
      "surname",
      "birthDate",
      "absences",
      "observations",
    ];

    this.dataSource = new MatTableDataSource();
    this.dataSource.data = dataStudents;
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
