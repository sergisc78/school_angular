import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//MODULES
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

// COMPONENTS

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';


import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTeacherComponent } from './components/dashboard/add-teacher/add-teacher.component';
import { ListTeachersComponent } from './components/dashboard/list-teachers/list-teachers.component';
import { ListStudentsComponent } from './components/dashboard/list-students/list-students.component';
import { AddStudentComponent } from './components/dashboard/add-student/add-student.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AddTeacherComponent,
    ListTeachersComponent,
    ListStudentsComponent,
    AddStudentComponent,
    ErrorPageComponent,
    ContactComponent,
    AboutComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
    
    //AngularFireAuthModule,
    //AngularFireAuth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
