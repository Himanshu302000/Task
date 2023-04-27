import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskHistory } from './delete/delete.component';
import { Email } from './email';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {


    constructor(private http:HttpClient) { }

    ////DASHBOARD////
    getAllTaskName(id:number)
    {
      
      return this.http.get(`http://localhost:8080/api/v1/task/getAllTask/${id}`);
    }

    getAllTaskByUserIdHistory(id:number)
    {
      return this.http.get<TaskHistory[]>(`http://localhost:8080/api/v1/task-history/getAllTaskHistory/${id}`);
    }

    ////DELETE//////
    getAllTaskHistory()
    {
      
      return this.http.get<TaskHistory[]>("http://localhost:8080/api/v1/task-history/getAllTaskHistory");
  
    }
   complete(bodyData:any)
      {
      
        console.log(bodyData);
        return this.http.post("http://localhost:8080/api/v1/task-history/saveHistory",bodyData,{responseType: 'text'})
      }
  
   sendEmailtodelete(email: Email)
  {
        return this.http.post("http://localhost:8080/api/emails/send", email);
  }
  
 ///////LOGIN/////////
 getUserarray():Observable<any>{
   return this.http.get<User>("http://localhost:8080/getUsers")
 }

 /////SIGNUP////////


 saveUser(user: User):Observable<any>{
  return this.http.post<User>('http://localhost:8080/saveUser', user);
}

///////TASK//////


getAllTask() //show
  {
    
    return this.http.get("http://localhost:8080/api/v1/task/getAllTask");

  }
  setDelete(data: any) //delete
  {
    
    
    return this.http.delete("http://localhost:8080/api/v1/task/delete"+ "/"+ data.taskid,{responseType: 'text'})
  }

  UpdateRecords(bodyData:any)//upate
    {
    
      console.log(bodyData);
      return this.http.put("http://localhost:8080/api/v1/task/update/"+bodyData.taskId,bodyData)
    }
    register(bodyData:any) ///post
    {
    

      return this.http.post("http://localhost:8080/api/v1/task/save",bodyData,{responseType: 'text'})
    }
    Priorityset(bodyData:any) 
    {
    
      console.log(bodyData.taskid);
      return this.http.put("http://localhost:8080/api/v1/task/priority/"+bodyData.taskid,bodyData.priority)
    }

sendEmail(email:Email)
{
      return this.http.post("http://localhost:8080/api/emails/send", email);
}

  }