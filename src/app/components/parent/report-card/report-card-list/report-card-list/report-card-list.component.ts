import { ReportCardService } from './../../../../../services/reportCard.service';
import { ReportCard } from 'src/app/models/ReportCard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-report-card-list',
  templateUrl: './report-card-list.component.html',
  styleUrls: ['./report-card-list.component.css']
})
export class ReportCardListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  currentDate = new Date()
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  reportCardList: ReportCard[];



  constructor(private reportCardService: ReportCardService) {
    this.reportCardList = reportCardService.reportCardList
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'surname', 'download'];



    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.reportCardList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  public downloadPDF(index): void {
    let date = new Date()
    let billname = 'bill' + date.getDate() + date.getHours() + date.getSeconds()

    let reportCard = this.reportCardList[index]
    console.log(reportCard)

    const doc = new jsPDF();


    let src = 'D:/clickEscuela/src/assets/images/payOK.jpg'

    var imgData = btoa(src)
    //doc.addImage(imgData, 'jpg', 10, 78, 12, 15)


    let lineOffset = 10;
    var columns = ["Materia", "Nota"]
    var data = [];

    for (let [clave, valor] of reportCard.matters) {
      data.push([clave, valor])
    }
    console.log(data)

    doc.autoTable(columns, data,
      { margin: { top: 25 } }
    );





    doc.save(billname + '.pdf');
  }

}
