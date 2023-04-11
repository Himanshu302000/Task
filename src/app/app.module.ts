import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { TaskComponent } from './task/task.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  
  {path:"task",component:TaskComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"",component:LoginComponent}


]

@NgModule({  //The @NgModule decorator is applied to the  class, which specifies metadata about the module
  declarations: [
    AppComponent,
    TaskComponent,
    DashboardComponent,
 
    
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    IonicModule.forRoot(),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
