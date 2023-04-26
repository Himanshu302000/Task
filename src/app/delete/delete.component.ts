import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
//import { DeleteService } from './delete.service';
import { Task } from '../task/task.model';
import { MainServiceService } from '../main-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  userId:number=-1;
  constructor(private http: HttpClient, private api: MainServiceService,private route:ActivatedRoute) {
    this.getAllTaskHistory();
  }

  TaskArray: TaskHistory[]=[];
  name:any = '';

  getAllTaskHistory() {
    this.api.getAllTaskByUserIdHistory(this.userId).subscribe(res => {
       this.TaskArray=res;
       console.log(this.TaskArray);
    })
    
  }
  ngOnInit():void{
    this.name=sessionStorage.getItem('name');
    this.userId=this.route.snapshot.params['id'];
    console.log("In task history with userId "+this.userId);
     this.getAllTaskHistory();
    }


}

export class TaskHistory{
 // TaskId:number=-1;
  userId:number=-1;
  taskName:string='';
  taskDetail:string='';
  date:any;
  taskHistoryId:number=-1;
}
