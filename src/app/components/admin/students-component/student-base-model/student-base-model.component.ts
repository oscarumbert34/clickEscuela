import { AddStudentComponent } from '../add-student/add-student.component';
import { dataStudents } from '../../../teacher/students/students';
import { studentService } from '../../../../services/student.service';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { ConfirmDialogComponent } from '../../../commons/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-student-base-model',
  templateUrl: './student-base-model.component.html',
  styleUrls: ['./student-base-model.component.scss']
})
export class StudentBaseModelComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  studentsArray: Student[] = new Array(5);

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @Output() newEventEmitter= new  EventEmitter<any>()

  constructor( private studentsService: studentService, public dialog: MatDialog) {
    this.studentsArray=this.studentsService.studentsList
    this.displayedColumns = ['id', 'name', 'surname', 'birthDate', 'absences', 'observations'];
 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data =this.studentsService.studentsList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
   }

  ngOnInit()
  {
    this.displayedColumns = ['id', 'name', 'surname', 'birthDate', 'absences', 'observations'];
 
   // Assign the data to the data source for the table to render
   this.dataSource = new MatTableDataSource();
   this.dataSource.data =this.studentsService.studentsList;
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

  deleteStudent(index,input){

    console.log(input)
    this.confirmDialog("Desea eliminar el alumno "+input.name+" "+input.surname,index)
  }

  refreshTable() {
    console.log("Refresh exitoso")
    this.dataSource.data = this.studentsService.studentsList;
  }

  confirmDialog(input, index) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: input,
        width: '260px',
        height: '150px'
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.deleteStudent(index)
        this.refreshTable()

      }
    });
  }

  editStudent(ind,input)
  {
    const dialogRef = this.dialog.open(EditStudentComponent,
      {
        data: {student:input, index:ind},
        width: '100vw',
        height: '95vh',
        maxWidth:"95vw"
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

}
