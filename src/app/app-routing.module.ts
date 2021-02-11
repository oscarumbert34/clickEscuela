import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/admin/register/register.component';
import { MenuComponent } from './components/commons/menu/menu.component';
import { ParentMenuComponent } from './components/parent/parent-menu/parent-menu.component';


const routes: Routes = [{ path: 'teacher/menu' , component: MenuComponent},
                        { path: 'admin/register', component: RegisterComponent },

                        { path: 'parent/menu', component: ParentMenuComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
