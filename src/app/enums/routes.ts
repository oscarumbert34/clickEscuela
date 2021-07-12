import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/admin/register/register.component';
import { MenuComponent } from '../components/commons/menu/menu.component';
import { AsistanceComponent } from '../components/parent/asistance/asistance.component';
import { ParentMenuComponent } from '../components/parent/parent-menu/parent-menu.component';
import { StudentMenuComponent } from '../components/student/student-menu/student-menu.component';
export const routes: Routes=
[
    { path: 'teacher/menu', component: MenuComponent },
    { path: 'admin/register', component: RegisterComponent },
    { path: 'student/menu', component: StudentMenuComponent },
    { path: 'parent/menu', component: ParentMenuComponent },
    { path: 'parent/menu/asistance', component: AsistanceComponent}
]