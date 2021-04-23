
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('tabGroup',{static:false}) tab: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  makePDF(){
    // let pdf=new jsPDF('p','pt','a4');
    // pdf.html(this.tab.nativeElement,{
    //   callback: (pdf)=>{pdf.save("demo.pdf")}
    // })

    html2canvas(this.tab.nativeElement).then
    (canvas=>{
      
  //var img=canvas.toDataURL("image/png");
  var data= canvas.toDataURL();
  var docdef={
    content:[{
      image:data,
      width:500
    }]
  }
   //var doc = new jsPDF('p','pt','a4');
   //doc.addImage(img,'JPEG',20,20);
   //doc.save('test.pdf');
   pdfMake.createPdf(docdef).download("Score_Details.pdf");

    })
  }


}
