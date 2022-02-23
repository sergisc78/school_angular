import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTeacherComponent } from './components/dashboard/add-teacher/add-teacher.component';
import { HomeComponent } from './components/home/home.component';
import { ListTeachersComponent } from './components/dashboard/list-teachers/list-teachers.component';
import { ListStudentsComponent } from './components/dashboard/list-students/list-students.component';
import { AddStudentComponent } from './components/dashboard/add-student/add-student.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'aboutUs', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'listTeachers', component: ListTeachersComponent },
    { path: 'addTeacher', component: AddTeacherComponent },
    { path: 'listStudents', component: ListStudentsComponent },
    { path: 'addStudent', component: AddStudentComponent },
    ],
    
  },
  { path: 'editTeacher/:id', component: AddTeacherComponent },
  { path: 'editStudent/:id', component: AddStudentComponent },
  //{ path: '**', redirectTo: '', pathMatch: 'full' }, // If route doesn't exist, redirect to home
  { path: '**', component: ErrorPageComponent,pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
