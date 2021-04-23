import { Account } from './../models/Account';
import { Injectable } from '@angular/core';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

private accounts:Account[]

constructor() 
{ 
  this.accounts=[]

  let payment_1 = [];
  payment_1.push(new Payment(3200, new Date('12/04/2020'), true))
  payment_1.push(new Payment(2900, new Date('11/11/2020'), true))
  payment_1.push(new Payment(2900, new Date('10/08/2020'), true))

  let payment_2 = [];
  payment_2.push(new Payment(3200, new Date('12/04/2020'), true))
  payment_2.push(new Payment(2900, new Date('11/11/2020'), true))
  payment_2.push(new Payment(2900, new Date('10/08/2020'), true))

  let payment_3 = [];
  payment_3.push(new Payment(3200, new Date('12/04/2020'), true))
  payment_3.push(new Payment(2900, new Date('11/11/2020'), true))
  payment_3.push(new Payment(2900, new Date('10/08/2020'), false))

  let payment_4 = [];
  payment_4.push(new Payment(3200, new Date('12/04/2020'), false))
  payment_4.push(new Payment(2900, new Date('11/11/2020'), true))
  payment_4.push(new Payment(2900, new Date('10/08/2020'), false))
  payment_4.push(new Payment(2900, new Date('01/04/2021'), true))

  this.accounts.push(new Account('1','','',payment_4));
  this.accounts.push(new Account('2','','',payment_3));
  this.accounts.push(new Account('3','','',payment_2));
  this.accounts.push(new Account('4','','',payment_1));
  this.accounts.push(new Account('5','','',payment_3));
  this.accounts.push(new Account('6','','',payment_2));
  

}

get accountsList(){
  return this.accounts
}

}
