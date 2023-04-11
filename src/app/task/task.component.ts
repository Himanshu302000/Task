import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  TaskArray : any[] =[];
  taskname:string = " ";
  taskdetail:string = " ";
 
  currentTaskID = " ";
  
    constructor(private http: HttpClient, ) {
      
      this.getAllTask();
    }

 
    getAllTask()
    {
      
      this.http.get("http://localhost:8080/api/v1/task/getAllTask")
    
      .subscribe((resultData: any)=>
      {
         
          console.log(resultData);
          this.TaskArray = resultData;
      });
    }
    register()
    {
    
      let bodyData = {
        "taskname" : this.taskname,
        "taskdetail" : this.taskdetail
        
      };
      this.http.post("http://localhost:8080/api/v1/task/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
         
          this.getAllTask();
   
          this.taskname = '';
        this.taskdetail = '';
      
      });
    }
    setUpdate(data: any)
    {
     this.taskname = data.taskname;
     this.taskdetail = data.taskdetail;
     
     this.currentTaskID = data.taskid;
    }
    UpdateRecords()
    {
      let bodyData = {
        "taskid" : this.currentTaskID,
        "taskname" : this.taskname,
        "taskdetail" : this.taskdetail
        
      };
      
      this.http.put("http://localhost:8080/api/v1/task/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Employee Registered Updateddd")
          this.getAllTask();
          this.taskname = '';
          this.taskdetail = '';
         
      });
    }
    save()
    {
      if(this.currentTaskID == '')
      {
          this.register();
      }
        else
        {
         this.UpdateRecords();
        }      
    }
    setDelete(data: any)
    {
      
      
      this.http.delete("http://localhost:8080/api/v1/task/delete"+ "/"+ data.taskid,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
        
          this.getAllTask();
   
          this.taskname = '';
          this.taskdetail = '';
         
    
      });
    }


    
}
