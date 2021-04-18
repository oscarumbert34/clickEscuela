import { Account } from './../models/Account';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

private accounts:Account[]

constructor() 
{ 
  this.accounts=[]

  this.accounts.push(new Account('12','','',[],true));
  this.accounts.push(new Account('68','','',[],false));
  this.accounts.push(new Account('25','','',[],true));
  

}

get accountsList(){
  return this.accounts
}

}
