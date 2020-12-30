import { Injectable } from '@angular/core';
import {Payment} from '../models/Payment'

@Injectable({
  providedIn: 'root'
})
export class PaymentService 
{
paymentList:Payment[]
constructor() 
{
this.paymentList=[];
this.paymentList.push (new Payment(3200,new Date('12/01/2020'),false))
this.paymentList.push (new Payment(2900,new Date('11/01/2020'),true))
this.paymentList.push (new Payment(2900,new Date('10/01/2020'),true))

 }

}
