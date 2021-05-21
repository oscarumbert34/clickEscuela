import { MatDatepicker } from '@angular/material/datepicker';
import { Homework } from '../../../../models/Homework';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeworkService } from 'src/app/services/homework.service';



@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.scss']
})
export class AddHomeworkComponent implements OnInit {

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<any>;

  currentHomework: Homework;
  existData: boolean;
  localData: any;
  courses=[
    "1A","2A","1B","2B"
  ]
  matters=[
    "Historia","Geografia","Matematicas","Ciencias Sociales","Ingles","Lengua","Quimica"
  ]
  
  constructor(public dialogRef: MatDialogRef<AddHomeworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeworkService: HomeworkService) {
    this.existData = false;
    if (data.homework === undefined) {
      this.currentHomework =
      {
        code: "T0001",
        name: "",
        description: "",
        deliveryDate: null,
        course: "",
        matter: ""
      }
      this.localData =
      {
        homework:
        {
          code: "",
          name: "",
          description: "",
          deliveryDate: null,
          course: "",
          matter: ""
        },
        index: 0

      }
    }

    else {
      this.currentHomework = this.data.homework
      this.localData = this.data;

    }
    this.existData = !!data.homework



    console.log(this.existData)
  }



  addHomework() {
    console.log(this.currentHomework)
    this.homeworkService.addHomework(this.currentHomework)
    console.log(this.homeworkService.homeworkList)
    this.dialogRef.close()
  }

  modifyHomework() {

    this.homeworkService.modifyHomework(this.data.index, this.data.homework)
    this.dialogRef.close()
  }

  onClose(){
    this.dialogRef.close(false)
  }


  ngOnInit() {

  }

}
