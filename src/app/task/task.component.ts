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
  validUpdate:boolean=false;

  
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
    this.task.userId=this.userId;
    console.log(this.task.userId+"------------------------------->")

    this.userId=this.route.snapshot.params['id'];
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
    setUpdate(data: any) {


    // this.taskname = data.taskname;
    // this.taskdetail = data.taskdetail;
    // this.priority = data.priority;
    // this.currentTaskID = data.taskid;
    // this.targetDate = data.targetDate;

    console.log(data);
      this.taskUpdate.taskId=data.taskid;
      this.taskUpdate.targetDate=data.targetDate;
      this.taskUpdate.priority=data.priority;
      this.taskUpdate.taskdetail=data.taskdetail;
      this.taskUpdate.taskname=data.taskname;
      this.taskUpdate.userId=this.userId;


      this.task.taskId=data.taskid;
      this.task.targetDate=data.targetDate;
      this.task.priority=data.priority;
      this.task.taskdetail=data.taskdetail;
      this.task.taskname=data.taskname;
      this.task.userId=this.userId;
      this.validUpdate=true;


  }

  UpdateRecords() {
    this.validUpdate=false;
    console.log(this.task.taskId)
    // let bodyData = {
    //   "taskid" : this.currentTaskID,
    //   "taskname" : this.taskname,
    //   "taskdetail" : this.taskdetail,
    //   "priority" : this.priority,
    //   "targetDate" : this.targetDate
    // };
      
    this.api.UpdateRecords(this.task).subscribe((resultData: any) => {
      alert("Task Updated");
      this.getAllTask();
      this.taskname = '';
      this.taskdetail = '';
      this.currentTaskID = '';
      this.priority = '';
      this.targetDate = '';
      this.task=new Task();
    });
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