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

  this.accounts.push(new Account('12','','',payment_1,true));
  this.accounts.push(new Account('68','','',payment_2,false));
  this.accounts.push(new Account('25','','',payment_3,true));
  

}

get accountsList(){
  return this.accounts
}

}
