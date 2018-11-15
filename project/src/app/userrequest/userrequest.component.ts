import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
//import { NgForOf } from '@angular/common';
//import { userInfo } from 'os';



@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {
  //userrequest;
  socket;
  toDoList;
  signUpForm;
  //userdetail to be used in the html page

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    this.socket = io();
   }

  ngOnInit() {
    this.getToDos();
    this.socket.on('update-msg', () => {
      this.getToDos();
    })
  }
/*
    this.userService.getuserrequest().subscribe(
    res => {
      this.signUpForm = res['user'];
    },
    err => { 
      console.log(err);  
    }
  );
*/

getToDos()
  {
    this.userService.getuserrequest().subscribe((user) => {
      this.toDoList = user;
      console.log("userconnection success gettodo()");
    });

  }

// accept button function
  accept(email:any){
    console.log(email);
    console.log()
    this.userService.acceptuser(email).subscribe(
      req => {
        this.signUpForm.email;
        //console.log("enter the acceptfield");
        //console.log(email);
      },
      err => {
        console.log(err);
      }
    );
  }

  /*   this.userService.acceptuser();
      req => {
        console.log(req['value']);
      },
      err => { 
        console.log(err);  
      }
}*/
onLogout(){
  this.userService.deleteToken();
  this.router.navigate(['/welcome']);
}

}