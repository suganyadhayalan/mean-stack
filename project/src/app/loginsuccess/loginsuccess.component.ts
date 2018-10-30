import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { User } from '../shared/user.model';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  userDetails;
  //userdetail to be used in the html page

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getloginsuccess().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  //logout function
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  }


