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
import { DashboardComponent } from './components/commons/dashboard/dashboard.component';
import { LoadDashboardComponent } from './components/commons/load-dashboard/load-dashboard.component';
import { DetailStudentComponent } from './components/commons/detail-student/detail-student.component';
@NgModule({
  declarations: [
    AppComponent,
    DetailStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    TeacherModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
