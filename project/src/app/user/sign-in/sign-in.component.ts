import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'] 
})
export class SignInComponent implements OnInit {
  //inject the userservice and router class
  constructor(private userService: UserService,private router : Router) { }
  model ={
    email : '',
    password: ''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(([A-Za-z\d@$!%*#?&])\2?(?!\2))+$/;
  
  serverErrorMessages: string;

  ngOnInit() {
    //once user logged-in into the loginsuccess page, again user go to the login page it directly navigate loginsuccess 
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/loginsuccess');
  }
  
  onSubmit(form : NgForm){
  //form.value refer the email and password value
    this.userService.login(form.value).subscribe(
      //call back res to be called
      res => {
        this.userService.setToken(res['token']);//token to be stored in local machine
        this.router.navigateByUrl('/loginsuccess');//successfull login
      },
      err => {
        this.serverErrorMessages = err.error.message;

      }
    );
  }


}


