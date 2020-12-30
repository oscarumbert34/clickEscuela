import { Payment } from './../../../../models/Payment';
import { PaymentService } from './../../../../services/payment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AsistanceParent } from 'src/app/models/AsistanceParent';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: any;
  currentDate= new Date()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paymentList: Payment[];

  takeAsistance:boolean;

  constructor(private paymentService: PaymentService) 
  { 
    this.paymentList=paymentService.paymentList
  }

  ngOnInit() 
  {
    this.displayedColumns = ['amount','status', 'expiration', 'paybill'];

 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.paymentList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.paymentList)
  }

  refreshTable()
  {
    console.log("Refresh exitoso")
    this.dataSource.data = this.paymentService.paymentList
  }


  applyFilter(event: Event)
   {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
