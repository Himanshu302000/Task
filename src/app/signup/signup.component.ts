import { Component } from '@angular/core';
//import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  
  constructor(private router:Router , private service: MainServiceService){}

  email:string = '';
  password:string=''
  userName:string=''
  user: User = new User();


  signup(){
    this.service.saveUser(this.user).subscribe(resp =>{
      this.router.navigateByUrl('');
  })
  }

}


