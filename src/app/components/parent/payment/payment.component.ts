import { ConfirmDialogComponent } from 'src/app/components/commons/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  currentDate: Date;
  nextExpiration: Date;
  paymentList: Payment[];
  faultpayments: Payment[];

  paymentDebt = 0;

  constructor(private paymentService: PaymentService, private dialog: MatDialog) {
    this.currentDate = new Date()
    this.nextExpiration = new Date()
    this.nextExpiration.setFullYear(2021);
    this.nextExpiration.setDate(12)
    this.nextExpiration.setMonth(3)
    this.paymentList = paymentService.paymentList
    this.faultpayments = []

  }

  getDetail() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: this.faultpayments,
        width: '60%',
        height: '300px'
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      if (result) {



      }
    });

  }

  getDebt() {
    let debts = this.paymentList.filter(a => a.status == false)
    this.faultpayments = debts;

    console.log(debts)

    this.paymentDebt = 0;
    for (let element of debts) {
      this.paymentDebt += element.amount;
    }

    console.log(this.paymentDebt)

  }

  ngOnInit(): void {
    this.getDebt()
    console.log("EL pago que falta es " + this.paymentDebt)
  }

}
