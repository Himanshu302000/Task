import { NgModule } from '@angular/core';
//import{NgxCaptchaModule} from 'ngx-captcha'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { TaskComponent } from './task/task.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DeleteComponent } from './delete/delete.component';

import { SignupComponent } from './signup/signup.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
//import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChatbotComponent } from './chatbot/chatbot.component';
//import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';



const routes: Routes = [
  
  {path:"task/:id",component:TaskComponent},
  // {path:"task",component:TaskComponent},
  {path:"dashboard/:id",component:DashboardComponent},
  // {path:"dashboard",component:DashboardComponent},
  {path:"",component:LoginComponent},
  {path:"delete/:id",component:DeleteComponent},
  // {path:"delete",component:DeleteComponent},
  {path:"signup",component:SignupComponent},
  {path:"chatbot",component:ChatbotComponent}



]

@NgModule({  
  declarations: [
    AppComponent,
    TaskComponent,
    DashboardComponent,
    LoginComponent,
    DeleteComponent,
    SignupComponent,
    ChatbotComponent,
 ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
