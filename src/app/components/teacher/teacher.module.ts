import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../commons/notification/notification.component';
import {MatIconModule} from '@angular/material/icon';
import { StudentListComponent } from './student-list/student-list.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from '../commons/dashboard/dashboard.component';
import { LoadDashboardComponent } from '../commons/load-dashboard/load-dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { DashboardChartComponent } from '../commons/dashboard-chart/dashboard-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardChartAdvanceComponent } from '../commons/dashboard-chart-advance/dashboard-chart-advance.component';
import { DashboardVerticalComponent } from '../commons/dashboard-vertical/dashboard-vertical.component';


@NgModule({
  declarations: [MenuComponent, NotificationComponent, StudentListComponent,
                 HomeComponent, CoursesComponent, LoadDashboardComponent, DashboardComponent,
                 DashboardChartComponent,DashboardChartAdvanceComponent, DashboardVerticalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    NgbModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    NgxChartsModule
  ],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[MenuComponent]
})
export class TeacherModule { }
