import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { User } from '../shared/user.model';


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
  );
 
  }
onLogout(){
  this.userService.deleteToken();
  this.router.navigate(['/welcome']);
}

}