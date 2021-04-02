import { WorkGroupService } from './../../../../../services/work-group.service';
import { Component, Input, OnInit } from '@angular/core';
import { WorkGroup } from 'src/app/models/WorkGroup';
import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() group: WorkGroup;
  @Input() currentIndex: number;
  @Input() currentSender: string;

  constructor(private workGroupService: WorkGroupService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.group)
  }

  addComment(index,comment)
  {
    this.workGroupService.addComment(index,this.currentSender,comment)
  }

  addHistory(index,history)
  {
    this.workGroupService.addHistory(index,this.currentSender,history)
  }

  confirmDelete(index) {
   

    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: "¿Desea Eliminar este comentario?",
        width: '60%',
        height: '150px'
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.deleteComment(index)
      
      }
    });
  }

  deleteComment(index: any)
  {
    console.log(index)
  this.workGroupService.deleteComment(this.currentIndex,index)
  this.addHistory(index, "Elimino un comentario")
  }
}




