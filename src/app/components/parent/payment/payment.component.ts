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

  paymentDebt = 0;

  constructor(private paymentService: PaymentService) {
    this.currentDate = new Date()
    this.nextExpiration = new Date(8, 1, 2021)
    this.paymentList = paymentService.paymentList

  }

  getDebt() {
    let debts = this.paymentList.filter(a => a.status == false)
    console.log(debts)

    this.paymentDebt = 0;
    for (let element of debts) {
      this.paymentDebt += element.amount;
    }

    console.log(this.paymentDebt)

  }

  ngOnInit(): void {
    this.getDebt()
  }

}
