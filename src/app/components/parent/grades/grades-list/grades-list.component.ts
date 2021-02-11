
import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Output, Input } from '@angular/core';
import { Grade } from 'src/app/models/Grade';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GradesService } from 'src/app/services/grades.service';
import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
import { PopupMenuComponent } from 'src/app/components/commons/popupMenu/popupMenu.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';



@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  gradesArray: Grade[] = new Array(5);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('student') student: ElementRef;

  @ViewChildren(GradesListComponent) listGrades: QueryList<GradesListComponent>;

  @Input() son;



  public selectedIndexBinding = 0;


  gradesList: Grade[];

  constructor(private gradeService: GradesService, public dialog: MatDialog) {

    this.gradesList = new Array();
    this.gradesList = gradeService.gradesList.filter(a => a.student == "Alberto Sanchez")

  }

  applySonFilter() {
    this.gradesList = this.gradeService.gradesList.filter(a => a.student == this.son)
    this.dataSource = this.gradesList

  }



  ngOnInit() {

    this.displayedColumns = ['student', 'description', 'matter', 'grade'];


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.gradesList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.applySonFilter()


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteGrade(index) {

    this.gradeService.deleteGrade(index);
    this.refreshTable()
  }



  modifyGrade(index, grade) {
    this.gradeService.modifyGrade(index, grade)
  }

  confirmDelete(index) {
    this.confirmDialog("¿Desea eliminar la nota?", index);
  }

  confirmDialog(input, index) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: input,
        width: '60%',
        height: '150px'
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGrade(index)

      }
    });
  }

  openModify(index, grade) {
    const dialogRef = this.dialog.open(PopupMenuComponent,
      {

        data: { grade: grade, index: index },
        width: '80%',
        height: '75%'

      }


    )

    dialogRef.afterClosed().subscribe(res => { this.refreshAllChildrens() })

  }


  refreshAllChildrens() {
    for (let comp of this.listGrades) {
      comp.refreshTable()
    }

  }

  refreshTable() {
    console.log("Refresh exitoso")
    this.dataSource.data = this.gradesList;
  }

  showSon() {
    console.log(this.son)
  }

}
