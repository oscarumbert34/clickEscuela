import { TeacherService } from 'src/app/services/teacher.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
import { Teacher } from 'src/app/models/Teacher';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-base-model',
  templateUrl: './teacher-base-model.component.html',
  styleUrls: ['./teacher-base-model.component.scss']
})
export class TeacherBaseModelComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  teachersArray: Teacher[] = new Array(5);

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  constructor( private teachersService: TeacherService, public dialog: MatDialog) {
    this.teachersArray=this.teachersService.teachersList
    this.displayedColumns = ['name', 'surname', 'bornDate','idNumber','courses','actions'];
 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data =this.teachersService.teachersList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
   }

  ngOnInit()
  {
    this.displayedColumns = ['name', 'surname', 'bornDate','idNumber','courses','actions'];
 
   // Assign the data to the data source for the table to render
   this.dataSource = new MatTableDataSource();
   this.dataSource.data =this.teachersService.teachersList;
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

  deleteTeacher(index,input){

    console.log(input)
    this.confirmDialog("Desea eliminar el alumno "+input.name+" "+input.surname,index)
  }

  refreshTable() {
    console.log("Refresh exitoso")
    this.dataSource.data = this.teachersService.teachersList;
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
        this.teachersService.deleteTeacher(index)
        this.refreshTable()

      }
    });
  }

  editTeacher(ind,input)
  {
    const dialogRef = this.dialog.open(EditTeacherComponent,
      {
        data: {teacher:input, index:ind},
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