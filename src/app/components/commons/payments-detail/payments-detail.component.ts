import { style } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/Payment';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-payments-detail',
  templateUrl: './payments-detail.component.html',
  styleUrls: ['./payments-detail.component.scss']
})
export class PaymentsDetailComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  totalDebt:number
  years:number[]
  months:number[]
  selectedYear:number;
  selectedMonth:number;

  monthsNames=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  
  constructor(public dialogRef: MatDialogRef<PaymentsDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: Payment[], private snackBar: MatSnackBar) {
    this.totalDebt=this.getTotalDebt(data)
    this.years=[]
    this.months=[]
    this.selectedMonth=-1;
    this.selectedYear=new Date().getFullYear()
    for (let i=1900;i<2036;i++)
    {
      
      this.years.push(i)
    }
    for (let j=1;j<=12;j++){
      this.months.push(j)
    }
   }

  ngOnInit() 
  {
    console.log(this.data)
    this.displayedColumns = ['period','amount','status','actions'];
 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data =this.data
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }

  getTotalDebt(data)
  {
    let debt=0;
    for (let payment of data)
    {
      if (!payment.status){
        debt+=payment.amount
      }
    }
    return debt
  }

  filterByMonth()
  {
    if (this.selectedMonth!=-1)
    {
      let result=this.data.filter(a =>a.period.getMonth()==this.selectedMonth-1)
      if (result.length>0)
      {
        this.dataSource=result
        this.showSnackBar("Estos son los resultados para el mes de "+this.monthsNames[this.selectedMonth-1])
      }
      else{
        this.selectedMonth=-1;
        this.dataSource=this.data;
        this.showSnackBar("No se encontraron para facturas para el periodo solicitado")

      }

      


    }
    else{
      this.showSnackBar("Selecciones un mes valido")
      this.dataSource=this.data
    }
  }

  filterByYear()
  {
    if (this.selectedYear!=-1)
    {
      let result=this.data.filter(a =>a.period.getFullYear()==this.selectedYear)
      if (result.length>0)
      {
        this.dataSource=result
        this.showSnackBar("Estos son los resultados para el año "+this.selectedYear)
      }
      else{
        this.selectedMonth=-1;
        this.dataSource=this.data;
        this.showSnackBar("No se encontraron para facturas para el periodo solicitado")

      }
    }
    else{
      this.showSnackBar("Selecciones un año valido")
      this.dataSource=this.data
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Aceptar", { duration: 5500 })
  }


  public downloadPDF(payment:Payment): void {
    let date = new Date()
    let billname = 'bill' + date.getDate() + date.getHours() + date.getSeconds()

    

    const doc = new jsPDF();
    doc.setFontSize(10)


    doc.text("[Nombre de la escuela]",10,15)
    doc.text('[Calle]',10,20)
    doc.text('[Cidad, Provincia y codigo postal]',10,25)
    doc.text('[Telefono (000)000-0000]',10,30)

    doc.setFontSize(20)
    doc.setTextColor(45,92,132)

    doc.text("FACTURA",150,15)

    doc.setFontSize(10)
    doc.setTextColor(0,0,0)

    
    doc.setFillColor(45,92,132)
    doc.rect(10, 35, 60, 7, 'F')

    doc.setTextColor(255,255,255)
    doc.text("Datos del alumno",27,40)

    doc.setTextColor(0,0,0)

    doc.text("[Nombre y apellido del alumno]",10,50)

    doc.setFillColor(45,92,132)
    doc.rect(125, 25, 60, 7, 'F')



  
   
    var columns = ["Descripcion", "Cant","Precio Unitario","Importe"]
    var data = ["Pago de cuota","1"];

    var voidCells=["","","",""]
    data.push(""+payment.amount+"$")
    data.push(""+payment.amount+"$")

    let tableData:any[]=[];

    tableData.push(data)

    for (let i=0;i<15;i++){
      tableData.push(voidCells)
    }

    
    console.log(data)

    

    doc.autoTable(columns, tableData,
      { 
        margin: { top: 60 },
        styles:
        {
          lineWidth:0.1,
          lineColor:[60,60,60]
        },
        
        headStyles:{ fillColor: [45,92,132]}
      }
    );

    

   // doc.save(billname + '.pdf');
   doc.output('dataurlnewwindow')
  }




}
