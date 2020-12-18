import { ParentModule } from './components/parent/parent.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './components/admin/admin.module';
import { TeacherModule } from './components/teacher/teacher.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationComponent } from './components/commons/notification/notification.component';
import { LoadDashboardComponent } from './components/commons/load-dashboard/load-dashboard.component';
import { DetailStudentComponent } from './components/commons/detail-student/detail-student.component';
import { DashboardChartComponent } from './components/commons/dashboard-chart/dashboard-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { DashboardChartAdvanceComponent } from './components/commons/dashboard-chart-advance/dashboard-chart-advance.component';
import { VerticalBarChartComponent } from './components/commons/vertical-bar-chart/vertical-bar-chart.component';
import { DashboardVerticalComponent } from './components/commons/dashboard-vertical/dashboard-vertical.component';
@NgModule({
  declarations: [
    AppComponent,
    DetailStudentComponent,
    VerticalBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    TeacherModule,
    ParentModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
