import { MatDialog } from '@angular/material/dialog';
import { AccountService } from './../../../../services/account.service';
import { Student } from './../../../../models/student';
import { PaymentService } from './../../../../services/payment.service';
import { studentService } from './../../../../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentsDetailComponent } from 'src/app/components/commons/payments-detail/payments-detail.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  accounts: any[];
  studentsList:Student[]

  displayedColumns: string[];
  dataSource: any;  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  checked:boolean

  constructor(private studentsService:studentService,private accountsService: AccountService, private dialog: MatDialog) 
  {
    this.accounts=[]

    this.studentsList=this.studentsService.studentsList
    for (let student of this.studentsList)
    {
      this.checked=false
      let account=
      {
        name:student.name,
        surname:student.surname,
        course: student.course,
        titular: student.parent_1.name+' '+student.parent_1.surname,
        titularID:student.id,
        idAccount:student.parent_1.id,
        state: this.getAccountState(student.id)
      }

      console.log(account)
      this.accounts.push(account)
    }
  }

  

  ngOnInit()
  {
    this.displayedColumns = ['name', 'surname', 'course','titular','state', 'actions'];


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.accounts;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.accounts)
  }

  showDebtors()
  {
    if (this.checked)
    {
    let accountsDebtor=this.accounts.filter(a => a.state==false)
    this.dataSource.data=accountsDebtor
    console.log(accountsDebtor)
    
    }else{
      this.dataSource.data = this.accounts;
      

    }
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAccountState(id:string)
  {
    return this.accountsService.accountsList.filter(a =>a.$titularId==id)[0].$state
  }

  getPaymentDetail(id:string,student)
  {
    
    let payment=(this.accountsService.accountsList.filter(a =>a.$titularId==id)[0].$payments)
    const dialogRef = this.dialog.open(PaymentsDetailComponent,
      {
        data: {payment:payment,student:student},
        width: '100vw',
        height: '95vh',
        maxWidth:"95vw"
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });

  }

}
