import { Comment } from './../../../../../models/Comment';
import { ModalEditComponent } from './../../../modal-edit/modal-edit.component';
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
  }

  addComment(index,comment)
  {
    this.workGroupService.addComment(index,this.currentSender,this.normalize(comment))
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
  this.addHistory(this.currentIndex, "Elimino su comentario")
  }

  confirmEdit(element:Element,commentContent:Comment,index) {
   
    let elementWidth=element.clientWidth;
    let elementHeight=element.clientHeight;
    let elementRect=element.getBoundingClientRect()
    console.log(elementRect)


    const dialogRef = this.dialog.open(ModalEditComponent,
      {
        data:commentContent,
        width: elementRect.width+'px',
        height:  elementRect.height+'px',
        position: {top:elementRect.top+'px', left: elementRect.left+'px' }
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result!="") 
      {
        console.log(result) 
        dialogRef.close()
        this.editComment(index,result)
      
      }
    });
  }
  editComment(index: any,comment:string) {
    this.workGroupService.editComment(this.currentIndex,index,comment)
  this.addHistory(this.currentIndex, "Edito su comentario")
  }

  //Normaliza el comentario eliminando los saltos innecesarios
  normalize(word:string)
  {
    let wordRer= word.replace('\n',"");
    return wordRer
  }


}




