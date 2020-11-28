import { ConfirmDialogComponent } from './../../commons/confirm-dialog/confirm-dialog.component';
import { GradesService } from './../../../services/grades.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Grade } from 'src/app/models/Grade';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';



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
  
  constructor(private gradeService: GradesService,public dialog: MatDialog) 
  { 
    
    this.gradesList=new Array();
    this.gradesList=gradeService.gradesList
    
  }



  ngOnInit() 
  {

    this.displayedColumns = ['student', 'code', 'description', 'matter', 'grade','actions'];

 
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
  deleteGrade(index)
  {

      this.gradeService.deleteGrade(index);
      this.refreshTable()

    
  }

  confirmDelete(index)
  {
    this.confirmDialog("¿Desea eliminar la nota?",index);
  }

  confirmDialog(input,index)
  {
   
     const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {data: input,
      width: '20%',
      height:'20%'}
      )

    dialogRef.afterClosed().subscribe(result =>
    {
      if (result)
      {
        this.deleteGrade(index)

      }
    });
     

   
     
    
  }

  refreshTable()
  {
    console.log("Refresh exitoso")
    this.dataSource.data = this.gradesList;
  }
}
