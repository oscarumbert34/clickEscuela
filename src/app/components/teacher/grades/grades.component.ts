import { GradesListComponent } from './grades-list/grades-list.component';

import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGradeComponent } from './add-grade/add-grade.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  currentOption = 'Notas';
  @ViewChildren(GradesListComponent) listGrades: QueryList<GradesListComponent>;



  constructor(public dialog: MatDialog) {

  }

  openDialog(input) {
    const dialogRef = this.dialog.open(AddGradeComponent,
      {
        data: input,
        width: '80%',
        height: '75%'
      }
    );

    dialogRef.afterClosed().subscribe(res => { this.refreshAllChildrens(); });

  }

  refreshAllChildrens() {
    for (const comp of this.listGrades) {
      comp.refreshTable();
    }
    return true;

  }

  ngOnInit() {
  }

}
