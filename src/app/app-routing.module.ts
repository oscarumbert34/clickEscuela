import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/admin/register/register.component';
import { DetailStudentComponent } from './components/commons/detail-student/detail-student.component';
import { MenuComponent } from './components/commons/menu/menu.component';


const routes: Routes = [{ path: 'teacher/menu' , component: MenuComponent},
                        { path: 'admin/register', component: RegisterComponent },
                        { path: 'student/detail', component: DetailStudentComponent},
                        { path: 'parent/menu', component: MenuComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
