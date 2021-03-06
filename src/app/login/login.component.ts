import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={uname:'',
  password:''
}
jwtHelper = new JwtHelperService();
 token:any;


  constructor(private _auth:AuthService, private _router:Router,private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }
  loginUser(){
    //connect to auth service
    this._auth.loginUser(this.user)
    .subscribe(res=>{
         
      this.flashMessage.show('Login successful!!!', { cssClass: 'alert-success', timeout: 3000 });
      localStorage.setItem('token',res.token)//collect that token from response and store it on the client side storage
      
          
     this.token = localStorage.getItem('token')
      const tokenPayLoad = this.jwtHelper.decodeToken(this.token);
            
      // console.log(tokenPayLoad.userType);
  
      if(tokenPayLoad.userType== "Admin"){
        this._router.navigate(['/adminhome/dashboard'])//And Navigate to the Admin page
      }
      else if(tokenPayLoad.userType== "Alumni"){
        this._router.navigate(['/alumnipage/alumnidashboard'])//And Navigate to the Alumni page
      }
      else if(tokenPayLoad.userType== "Faculty"){
        this._router.navigate(['/facultyhome/dashboard_faculty'])//And Navigate to the Faculty page
      }
      else if(tokenPayLoad.userType== "Employer"){
        this._router.navigate(['/Hirerhome/dashboard_emp'])//And Navigate to the JOB Hirer page
      }
    },
    error => {
      if(error.status == 404){
        this.flashMessage.show('Your account needs an administrator approval in order to log in', { cssClass: 'alert-danger' , timeout: 3000 });
      }
      else{
        this.flashMessage.show('Invalid Username/password!!!', { cssClass: 'alert-danger' , timeout: 3000 });

      }
      
  }
    )

  }
  cancel(){
    this._router.navigate(['home'])
  }
}
