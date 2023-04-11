import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  TaskArray : any[] =[];
  taskname:string = " ";
  constructor(private http: HttpClient,public router:Router) {  //This line defines the constructor for the DashboardComponent class. 
    //It takes two parameters: http and router. http is an instance of the HttpClient class that will be used to make HTTP requests.
    // router is an instance of the Router class that will be used for navigation.

    this.getAllTask();
  }

  getAllTask()
  {
    
    this.http.get("http://localhost:8080/api/v1/task/getAllTask")
  
    .subscribe((resultData: any)=> //- This line subscribes to the result of the HTTP request
    // and defines a callback function to handle the response. 
    //The response is logged to the console and then the `TaskArray` is set to the result data.
    {
       
        console.log(resultData);
        this.TaskArray = resultData;
    });
  }
 seeMore(){  //This line defines a method `seeMore` which will be called when a button or link is clicked to navigate to a different view.

  this.router.navigateByUrl('/task')
 }

}
