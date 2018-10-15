import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers : [UserService] 
  // this userservice is defined in class of user.service.ts
})
export class SignUpComponent implements OnInit {
  
  //email validation
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //username = [a-z]+[A-Z]+[0-9_]+;
  
  showSuccessMessage: boolean;
  
  serverErrorMessages: string;
  

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
onSubmit(form : NgForm){
 
  //pass the user service class in postUser function
 
 this.userService.postUser(form.value).subscribe(
   res => {
     
     this.showSuccessMessage = true; //successfully data to be saved in database
     
     //4000sec only show success message to be display 
     setTimeout(() => this.showSuccessMessage = false,4000); 
     this.resetForm(form);
   },
   err => {
     //error message
     if (err.status == 422){
       this.serverErrorMessages = err.error.join('<br/>');
     }
     else
     //error in server side
     this.serverErrorMessages = 'something went wrong in server side';

   }
 );
}
//reset the form
resetForm(form: NgForm){
  this.userService.selectedUser = {
    fullName: '',
    email: '',
    password:'',
    projectName:''
  };
  form.resetForm();
  this.serverErrorMessages= '';
}
}
