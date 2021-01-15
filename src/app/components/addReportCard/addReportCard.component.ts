import { ReportCard } from './../../models/ReportCard';
import { TrimesterService } from './../../services/trimester.service';
import { ReportCardService } from './../../services/reportCard.service';
import { element } from 'protractor';
import { Component, Inject, OnInit, ElementRef, ViewChild, ViewChildren, Input, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addReportCard',
  templateUrl: './addReportCard.component.html',
  styleUrls: ['./addReportCard.component.scss']
})
export class AddReportCardComponent implements OnInit {

  mattersList: string[];
  trimesterList:ReportCard[];
  existData: boolean;
  @ViewChildren('grade') inputs: ElementRef[];
  @ViewChildren('trimesterTab') tabs: QueryList<ElementRef>;

  selectedTrimester=0;
  showTrimester=0;

  constructor(public dialogRef: MatDialogRef<AddReportCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private reporcardService: ReportCardService,private trimesterService:TrimesterService) 
  { 
    
  
    this.existData=this.data.component!==undefined
    this.trimesterList=this.trimesterService.reportCardList
    
    
  }

  changeSelectedTrimester(trimes)
  {
    if (trimes==this.selectedTrimester)
      this.selectedTrimester=0;
      else
    this.selectedTrimester=trimes;
  }



  changeTrimester()
  {
    this.trimesterList=this.trimesterService.trimesterList.filter(a => a.nameStudent==this.data.component.nameStudent && a.surnameStudent==this.data.component.surname)
    console.log(this.trimesterList.length)

    

    for (let i=0;i<this.trimesterList.length;i++)
    {
      console.log(      this.tabs.filter((element,index)=> index===i)
    
      )

      this.tabs.filter((element,index)=> index===i)[0].nativeElement.disabled=false;
      
     // console.log(this.tabs._results[i])

    }
    //console.log(this.tabs._results)
  }
  


  closeOnClick()
  {
    this.dialogRef.close()
  }

  ngOnInit() 
  {
    console.log(this.existData)
  }

  addReportCard(index)
  {
    let gradesList=[];
    for (let elem of this.inputs)
    { 
      gradesList.push(elem.nativeElement.value)
    }
    this.reporcardService.addReportCard(gradesList,index)
  }



 
  

}
