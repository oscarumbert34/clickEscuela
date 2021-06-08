
import { element } from 'protractor';
import { Component, Inject, OnInit, ElementRef, ViewChild, ViewChildren, Input, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportCardService } from 'src/app/services/reportCard.service';
import { TrimesterService } from 'src/app/services/trimester.service';
import { ReportCard } from 'src/app/models/report-card';

@Component({
  selector: 'app-addReportCard',
  templateUrl: './add-report-card.component.html',
  styleUrls: ['./add-report-card.component.scss']
})
export class AddReportCardComponent implements OnInit {

  mattersList: string[];
  trimesterList: ReportCard[];
  existData: boolean;
  @ViewChildren('grade') inputs: ElementRef[];
  @ViewChildren('trimesterTab') tabs: QueryList<ElementRef>;

  selectedTrimester = -1;
  showTrimester = false;

  trimesterNumber: string;

  currentData: ReportCard;

  constructor(public dialogRef: MatDialogRef<AddReportCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private reporcardService: ReportCardService, private trimesterService: TrimesterService) {
    this.existData = this.data.component !== undefined
    this.trimesterList = this.trimesterService.reportCardList
    this.currentData = data.component;
    this.trimesterNumber = "Cargando notificaciones..."
  }

  changeSelectedTrimester(trimes) {
    if (trimes == this.selectedTrimester)
      this.selectedTrimester = -1;
    else
      this.selectedTrimester = trimes;

    this.currentData = this.trimesterService.trimesterList[trimes]
    console.log(this.trimesterNumber + "   " + this.selectedTrimester)

    switch (this.selectedTrimester) {
      case 0: this.trimesterNumber = "Calificaciones: Primer Trimestre"
        break;
      case 1: this.trimesterNumber = "Calificaciones: Segundo Trimestre"
        break;

      case 2: this.trimesterNumber = "Calificaciones: Tercer Trimestres"
        break;

      default:
        {
          this.trimesterNumber = "Cargando Calfificaciones"

          this.currentData = this.data.component
        }
        break;

    }
  }



  changeTrimester() {



    if (!this.showTrimester) {
      this.trimesterList = this.trimesterService.trimesterList.filter(a => a.nameStudent == this.data.component.nameStudent && a.surnameStudent == this.data.component.surname)
      console.log(this.trimesterList.length)




      for (let i = 0; i < this.trimesterList.length; i++) {
        console.log(this.tabs.filter((element, index) => index === i))

        this.tabs.filter((element, index) => index === i)[0].nativeElement.disabled = false;

        this.showTrimester = true;

      }
    }

  }



  closeOnClick() {
    this.dialogRef.close()
    this.showTrimester = false;

  }

  ngOnInit() {
    console.log(this.existData)
  }

  addReportCard(index) {
    let gradesList = [];
    for (let elem of this.inputs) {
      gradesList.push(elem.nativeElement.value)
    }
    this.reporcardService.addReportCard(gradesList, index)
  }






}
