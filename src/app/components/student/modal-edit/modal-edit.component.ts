import { Comment } from './../../../models/Comment';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalEditComponent>, @Inject(MAT_DIALOG_DATA) public data: Comment) { }

  ngOnInit()
  {
  }

  getCommentContent(){
    return this.data.content
  }

}
