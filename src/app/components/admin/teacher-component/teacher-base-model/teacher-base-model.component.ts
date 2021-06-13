import { TeacherService } from 'src/app/services/teacher.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
import { Teacher } from 'src/app/models/teacher';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactInfoComponent } from 'src/app/components/commons/contact-info/contact-info.component';

@Component({
  selector: 'app-teacher-base-model',
  templateUrl: './teacher-base-model.component.html',
  styleUrls: ['./teacher-base-model.component.scss'],
})
export class TeacherBaseModelComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  teachersArray: Teacher[] = new Array(5);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private teachersService: TeacherService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TeacherBaseModelComponent>
  ) {
    this.teachersArray = this.teachersService.teachersList;
    this.displayedColumns = [
      'name',
      'surname',
      'bornDate',
      'idNumber',
      'courses',
      'actions',
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.teachersService.teachersList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onClose() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.displayedColumns = [
      'name',
      'surname',
      'bornDate',
      'idNumber',
      'courses',
      'actions',
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.teachersService.teachersList;
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

  deleteTeacher(index, input) {
    console.log(input);
    this.confirmDialog(
      'Desea eliminar el alumno ' + input.name + ' ' + input.surname,
      index
    );
  }

  refreshTable() {
    console.log('Refresh exitoso');
    this.dataSource.data = this.teachersService.teachersList;
  }

  confirmDialog(input, index) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: input,
      width: '260px',
      height: '150px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teachersService.deleteTeacher(index);
        this.refreshTable();
      }
    });
  }

  openContactInfo(input) {
    input.web = 'clickEscuela.com';
    const dialogRef = this.dialog.open(ContactInfoComponent, {
      data: input,
      width: '550px',
      height: '300px',
      panelClass: 'contact-info-back',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('finish');
      }
    });
  }

  editTeacher(ind, input) {
    const dialogRef = this.dialog.open(EditTeacherComponent, {
      data: { teacher: input, index: ind },
      width: '100vw',
      height: '95vh',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.refreshTable();
      }
    });
  }
}
