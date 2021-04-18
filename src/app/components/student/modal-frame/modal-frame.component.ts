import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-frame',
  templateUrl: './modal-frame.component.html',
  styleUrls: ['./modal-frame.component.css']
})
export class ModalFrameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalFrameComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
  {
   
  }

  ngOnInit() 
  {
  }

  onClose(){
    
    this.dialogRef.close()
  }

}
