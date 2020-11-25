import { PopupMenuComponent } from './../popupMenu/popupMenu.component';

import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(input)
  {
   const dialogRef=this.dialog.open(PopupMenuComponent,
    {data: input,
    width: '90%',
    height:'80%'}
    )

   dialogRef.afterClosed().subscribe(res =>{console.log("holis")})
  }

 

 
  ngOnInit(): void {
  }

}
