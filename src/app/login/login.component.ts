import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
//import { LoginService } from './login.service';
import { MainServiceService } from '../main-service.service';
import { FormGroup,FormControl, Validators ,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
 export class LoginComponent implements OnInit{
 capForm !:FormGroup;

  
constructor(public router:Router, private service:MainServiceService ,private formBuilder:FormBuilder,private fb:FormBuilder){}
  ngOnInit(): void {
    this.capForm = this.formBuilder.group({
      recaptcha: ["", Validators.required],
      name:[''],
      email:[''],
      password:['']
    });
    
    //throw new Error('Method not implemented.');
  }
  name:string='';
   password:string='';
    email:string='';
   userArray: User[] = [];
   user: User = new User();
   id:number=-1;
   userId:number=-1;
   siteKey:string="6LcKKrYlAAAAAJjik3VWU4mY67qZHceF1phhQeZi";
   

  login()
  {
    if(this.capForm.controls['recaptcha'].status==='INVALID') {alert("Wrong captcha"); return;}
    this.service.getUserarray().subscribe(res=>{
      this.userArray=res;
      console.log(this.userArray);

      for(let i=0;i<this.userArray.length;i++)
      {
        if(this.userArray[i].email===this.capForm.controls['email'].value && this.userArray[i].password===this.capForm.controls['password'].value)
        {
          
          sessionStorage.setItem('name',this.userArray[i].email);
          console.log(sessionStorage);
          this.userId  =this.userArray[i].id;
          this.router.navigate(['dashboard',this.userId]);
          return;
        }
      }
      alert(" Incorrect credentials");
    })
   
  }

  signup(){
       this.router.navigateByUrl('/signup');
    }
    

}

