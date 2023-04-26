import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { ModalController } from '@ionic/angular';
import { Email } from '../email';
import { MainServiceService } from '../main-service.service';
import { ActivatedRoute } from '@angular/router';
import { TaskHistory } from '../delete/delete.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  TaskArray: any;
  taskname: string = "";
  taskdetail: string = "";
  priority: any = "";
  newTaskPriority: string = '';
  name: any = '';
  targetDate: any = '';
  today: Date = new Date();
  tasks: Task[] = [];
  email: Email = new Email();
  currentTaskID = "";
  userId:number=-1;
  task:Task=new Task();
  taskHistory:TaskHistory=new TaskHistory();
 taskUpdate:Task=new Task();
 id:any;
  
  constructor(
    private api: MainServiceService,
    private api2: MainServiceService,
    private modelService: ModalController,
    private route:ActivatedRoute
  ) {
  }
  getAllTask() {
    
    this.api. getAllTaskName(this.userId).subscribe(res => {
      this.TaskArray = res;
      console.log(res);
    });
  }

  // REGISTER NEW TASK
  register() {
    console.log(this.task.userId+"------------------------------->")

    this.userId=this.route.snapshot.params['id'];
    // this.task.taskname='';
    // this.task.taskdetail='';
    // this.task.targetDate='';
    if (this.task.taskname.length === 0 ||this.task.taskdetail.length === 0 ||this.task.targetDate.length === 0) {
      alert("Fill all fields");
      return;
    }

    // DATA FOR NEW TASK
    // let bodyData = {
    //   "taskname" : this.taskname,
    //   "taskdetail" : this.taskdetail,
    //   "priority" : this.priority,
    //   "targetDate" : this.targetDate
    // };

    // API CALL TO REGISTER
    this.api.register(this.task).subscribe((resultData: any) => {
      console.log(resultData);

      // EMAIL DATA FOR REGISTER
      this.email.recipient = sessionStorage.getItem("name");
      this.email.subject = "New task added";
      this.email.body = "DETAILS OF TASK \n NAME:" + this.taskname + "\n DESCRIPTION: \n" + this.taskdetail + "\n TARGET-DATE: \n"+this.targetDate;
      
      this.api.sendEmail(this.email).subscribe((res: any) => {
        console.log("email sent");
      });
         
      this.getAllTask();
    });
   
  }

  // UPDATE API
  ///AFTER EDIT /////
    setUpdate(data:any) {
      this.taskUpdate=data;
      this.id = data.taskid;
      console.log(data);
      // this.task = data;
      // console.log(this.taskUpdate);
  }

  UpdateRecords(data:any)
  {
    //  let loginData=document.getElementById('loginForm');
    //  loginData?.addEventListener("submit",(e) =>{

      let userName=(document.getElementById('name') as HTMLInputElement).value;
      let description=(document.getElementById('description') as HTMLInputElement).value;
       let DateData=(document.getElementById('dateData') as HTMLInputElement).value;
      console.log(DateData);
      let obj={...this.task};
       obj={
      ...this.taskUpdate,
      taskname:userName,
      taskdetail:description,
      targetDate:DateData
     }
     console.log(obj);


    this.api2.UpdateRecords(obj).subscribe(res=>{
      // console.log(this.taskUpdate);
      this.api2.getAllTaskName(this.taskUpdate.userId).subscribe(res=>{
        this.TaskArray=res;
      })
    })
  }
  resetObj(){

    this.taskUpdate=new Task();
  }
  
  ////DELETE////

  setDelete(data: any) {
    this.api.setDelete(data).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllTask();
      this.taskname = '';
      this.taskdetail = '';
    });
  }

  setcomplete(data: any) {


     // HISTORYTABLE
     console.log(data);
     this.api2.complete(data).subscribe((res: any) => { console.log(res); });
     this.setDelete(data);

   // EMAIL DATA 
    this.email.recipient = sessionStorage.getItem("name");
    this.email.subject = "Task management";
    this.email.body = "Your task has been completed";
    
    // SEND EMAIL WITH DELETESERVICE
    this.api2.sendEmailtodelete(this.email).subscribe(res => {    
      console.log("email sent");
    });
    
   
  }
  clear(){
    // this.task.taskname='';
    // this.task.taskdetail='';
    // this.task.targetDate='';
  }
  ///SESSION
  ngOnInit(): void {
    this.userId=this.route.snapshot.params['id'];
    this.task.userId=this.userId;
    console.log("in task component with userId "+this.userId);
    this.name = sessionStorage.getItem('name');
    console.log(this.name + ".....");
    this.getAllTask();
  }


}
