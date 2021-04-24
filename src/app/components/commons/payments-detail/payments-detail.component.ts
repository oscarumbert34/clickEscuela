import { School } from './../../../models/School';
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

  currentSchool:School;

  currentDate=new Date()

  
  constructor(public dialogRef: MatDialogRef<PaymentsDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    this.totalDebt=this.getTotalDebt(data.payment)
    this.years=[]
    this.months=[]
    this.selectedMonth=-1;
    this.selectedYear=new Date().getFullYear()
   // this.currentSchool=new School("Escuelas tecnicas Raggio","Av. del Libertador 8635","CABA","Buenos Aires","C1429","(011) 4701-1791")

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
    console.log(this.data.payment)
    this.displayedColumns = ['period','amount','status','actions'];
 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data =this.data.payment
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
      let result=this.data.payment.filter(a =>a.period.getMonth()==this.selectedMonth-1)
      if (result.length>0)
      {
        this.dataSource=result
        this.showSnackBar("Estos son los resultados para el mes de "+this.monthsNames[this.selectedMonth-1])
      }
      else{
        this.selectedMonth=-1;
        this.dataSource=this.data.payment;
        this.showSnackBar("No se encontraron para facturas para el periodo solicitado")

      }

      


    }
    else{
      this.showSnackBar("Selecciones un mes valido")
      this.dataSource=this.data.payment
    }
  }

  filterByYear()
  {
    if (this.selectedYear!=-1)
    {
      let result=this.data.payment.filter(a =>a.period.getFullYear()==this.selectedYear)
      if (result.length>0)
      {
        this.dataSource=result
        this.showSnackBar("Estos son los resultados para el año "+this.selectedYear)
      }
      else{
        this.selectedMonth=-1;
        this.dataSource=this.data.payment;
        this.showSnackBar("No se encontraron para facturas para el periodo solicitado")

      }
    }
    else{
      this.showSnackBar("Selecciones un año valido")
      this.dataSource=this.data.payment
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Aceptar", { duration: 5500 })
  }


  public downloadPDF(payment:Payment): void {
    let date = new Date()
    let billname = 'bill' + date.getDate() + date.getHours() + date.getSeconds()

    const doc = new jsPDF('a4');
    doc.setFontSize(12)

   

    if (this.currentSchool!=undefined)
    {
    let name=this.currentSchool.$name;
    let adress=this.currentSchool.$adress
    let city=this.currentSchool.$city
    let province=this.currentSchool.$province
    let postalCode=this.currentSchool.$postalCode
    let tel=this.currentSchool.$telephone
    
    doc.text(name,45,15)
        doc.text(adress,45,21)
        doc.text(city+","+province+","+postalCode,45,27)
        doc.text('Telefono: '+tel,45,33)

        let img=new Image()
        img.src='assets/images/raggio.png'
        console.log(img)
        doc.addImage(img,'PNG',15,10,25,25) 
    }
    else{
      doc.text("[Nombre de la excuela]",45,15)
        doc.text("[Direccion]",45,21)
        doc.text(["[Ciudad, Provincia, Codigo Postal]"],45,27)
        doc.text('[Telefono]',45,33)

        let img=new Image()
        img.src='assets/images/logo-reduced.png'
        console.log(img)
        doc.addImage(img,'PNG',15,10,25,25)
    }

    

    doc.setFontSize(20)
    doc.setTextColor(45,92,132)

    doc.text("FACTURA",160,15)

    doc.setFontSize(12)
    doc.setTextColor(0,0,0)

    
    doc.setFillColor(45,92,132)
    doc.roundedRect(20, 40, 80, 7,2,2,'F')


    doc.setTextColor(255,255,255)
    doc.text("Datos del alumno",this.centerText(20,80,doc.getTextWidth("Datos del alumno")),45)

    doc.setTextColor(0,0,0)

    let studentName=this.data.student.name;
    let studentSurname=this.data.student.surname;

    doc.text(studentName+", "+studentSurname,25,52)

    doc.setFillColor(45,92,132)
    doc.roundedRect(115, 25, 80, 7,2,2, 'F')
    doc.roundedRect(115, 40, 80, 7,2,2, 'F')

    doc.setTextColor(255,255,255)

    doc.text("Nº de factura",123,30)
    doc.setFontSize(15)
    doc.text("|",155,30)
    doc.setFontSize(12)
    doc.text("Fecha",168.5,30)
    
    console.log(doc.getTextWidth("ID. del cliente"))
    console.log(doc.getTextWidth("Titular"))
    
    doc.text("ID. del cliente",122.25,45)
    doc.setFontSize(15) 
    doc.text("|",155,45)
    doc.setFontSize(12)
    doc.text("Titular",this.centerText(155,40,doc.getTextWidth("Titular")),45)
    
    doc.setTextColor(0,0,0)

    let billdate=this.currentDate.getDate()+"/"+(this.currentDate.getMonth()+1)+"/"+this.currentDate.getFullYear()

    doc.text("256",this.centerText(115,40,doc.getTextWidth("256")),37)
    doc.text(billdate,this.centerText(155,40,doc.getTextWidth(billdate)),37)

    let titularName=this.data.student.titular
    let titularID=this.data.student.idAccount


    doc.text(titularName,this.centerText(155,40,doc.getTextWidth(titularName)),52)
    doc.text(titularID,this.centerText(115,40,doc.getTextWidth(titularID)),52)

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

  centerText(initialPoint:number,containerWidth:number,stringWidht:number)
  { 
    console.log(initialPoint+stringWidht/2)
    return initialPoint+(containerWidth-stringWidht)/2;
  }




}
