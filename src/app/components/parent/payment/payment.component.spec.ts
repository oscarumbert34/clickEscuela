import { DecimalPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { studentService } from 'src/app/services/student.service';
import { AccountService } from 'src/app/services/account.service';
import { PaymentService } from './../../../services/payment.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule, DecimalPipe],
      declarations: [ PaymentComponent ],
      providers: [PaymentService, AccountService, studentService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
