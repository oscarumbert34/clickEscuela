import { DecimalPipe } from '@angular/common';
import { AccountService } from './../../../services/account.service';
import { studentService } from './../../../services/student.service';
import { IconGeneratorService } from 'src/app/services/icon-generator.service';
import { ExpensesService } from './../../../services/expenses.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountComponent } from './account.component';


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule],
      declarations: [AccountComponent],
      providers: [ExpensesService, IconGeneratorService, studentService, AccountService,DecimalPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
