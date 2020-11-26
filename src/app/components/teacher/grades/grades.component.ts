import { GradesListComponent } from './../grades-list/grades-list.component';

import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupMenuComponent } from '../../commons/popupMenu/popupMenu.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit 
{

  currentOption="Notas"
  @ViewChildren(GradesListComponent) listGrades: QueryList<GradesListComponent>;
 
  

  constructor(public dialog: MatDialog) 
  { 
    
  }

  openDialog(input)
  {
   const dialogRef=this.dialog.open(PopupMenuComponent,
    {data: input,
    width: '80%',
    height:'70%'}
    )

   dialogRef.afterClosed().subscribe(res =>{this.refreshAllChildrens()})
   
  }

  closeDialog()
  {
    this.dialog.closeAll
  }

  refreshAllChildrens(){
    for (let comp of this.listGrades)
    {
      comp.refreshTable()
    }
  }

  ngOnInit() 
  {
  }

}
