import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from "@angular/router";



@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {
  userrequest;
  //userdetail to be used in the html page

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { this.userService.getuserrequest().subscribe(
    res => {
      this.userrequest = res['user'];
    },
    err => { 
      console.log(err);  
    }
  );}
  
  accept(){
    console.log(this.userrequest);
    this.userService.acceptuser(this.userrequest).subscribe(
      req => {
        this.userrequest;
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