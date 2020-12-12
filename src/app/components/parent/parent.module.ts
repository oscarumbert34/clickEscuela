import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistanceComponent } from './asistance/asistance.component';
import { PaymentComponent } from './payment/payment.component';
import { MessagesComponent } from './messages/messages.component';
import { GradesComponent } from './grades/grades.component';
import { ReportCardComponent } from './report-card/report-card.component';



@NgModule({
  declarations: [AsistanceComponent, PaymentComponent, MessagesComponent, GradesComponent, ReportCardComponent],
  imports: [
    CommonModule
  ]
})
export class ParentModule { }
