import { BulletinsComponent } from '../../teacher/bulletins/bulletins.component';
import { PopupMenuComponent } from '../popupMenu/popupMenu.component';

import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(input)
  {
   const dialogRef=this.dialog.open(PopupMenuComponent,
    {data: input,
    width: '80%',
    height:'70%'}
    )

   dialogRef.afterClosed().subscribe(res =>{console.log("holis")})
  }



 

 
  ngOnInit(): void {
  }

}
