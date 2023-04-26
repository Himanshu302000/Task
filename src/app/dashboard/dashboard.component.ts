import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//import { DashboardServiceService } from './dashboard-service.service';
import { ModalController } from '@ionic/angular';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { User } from '../user';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  TaskArray: any;
  taskname: string = " ";
  name: any = '';
  userId: number = 0;

  constructor(private api: MainServiceService, public router: Router, private modelService: ModalController,private route:ActivatedRoute) {
    console.log(this.userId);
 }

  getAllName() {
    
    this.api.getAllTaskName(this.userId).subscribe(res => {
      this.TaskArray = res;
      console.warn(this.TaskArray);


    })
  }
  ngOnInit(): void {
    this.userId=this.route.snapshot.params['id'];
    this.name = sessionStorage.getItem('name');
    console.log(this.userId+"*******************");
    this.getAllName();
 }

  seeMore() {

    this.router.navigateByUrl('/task/:id')
  }

  async Button() {
    const dialog = await this.modelService.create({
      component: ChatbotComponent,
      cssClass: 'modalCss' ,
      backdropDismiss: false,
    });
    dialog.onDidDismiss();
    return await dialog.present();

  }

}
