import { GradesComponent } from './components/teacher/grades/grades.component';
import { HomeworkComponent } from './components/student/homework/homework.component';
import { CoursesComponent } from './components/teacher/courses/courses.component';
import { HomeComponent } from './components/teacher/home/home.component';
import { Error404Component } from './components/commons/Error404/Error404.component';
import { AsistanceComponent } from './components/teacher/asistance/asistance.component';
import { StudentMenuComponent } from './components/student/student-menu/student-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/admin/register/register.component';
import { MenuComponent } from './components/commons/menu/menu.component';
import { ParentMenuComponent } from './components/parent/parent-menu/parent-menu.component';
import { ReportCardComponent } from './components/parent/report-card/report-card.component';


const routes: Routes = [
  { path: 'teacher/menu', component: MenuComponent ,
  children: [
    { path: 'home', component: HomeComponent},
    { path: 'course', component: CoursesComponent},
    { path: 'homework', component: HomeworkComponent},
    { path: 'grade', component: GradesComponent},
    { path: 'reportCard', component: ReportCardComponent},
    { path: 'asistance', component: AsistanceComponent},
  ]},
  { path: 'admin/register', component: RegisterComponent },
  { path: 'student/menu', component: StudentMenuComponent },
  { path: 'parent/menu', component: ParentMenuComponent },
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
