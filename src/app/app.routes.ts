import { Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentsComponent } from './components/edit-students/edit-students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path: "add",
        component: AddStudentComponent,
        canActivate: [authGuard],
    },

    {
        path: "edit/:id",
        component: EditStudentsComponent,
        canActivate: [authGuard],
    },

    {
        path: "list",
        component: StudentsListComponent,
        canActivate: [authGuard],
    },

    {
        path: "**",
        component: PageNotFoundComponent,
        canActivate: [authGuard]
    },
];
