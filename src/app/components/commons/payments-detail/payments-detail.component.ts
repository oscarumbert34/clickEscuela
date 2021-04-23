import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/Payment';

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



}
