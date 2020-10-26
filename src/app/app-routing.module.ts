import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/teacher/menu/menu.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { DetailStudentComponent } from './components/commons/detail-student/detail-student.component';


const routes: Routes = [{ path: 'teacher/menu' , component: MenuComponent},
                        { path: 'admin/register', component: RegisterComponent },
                        { path: 'student/detail', component: DetailStudentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
