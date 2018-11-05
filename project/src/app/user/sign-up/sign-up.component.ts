import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
  //providers : [UserService] 
  // this userservice is defined in class of user.service.ts
})
export class SignUpComponent implements OnInit {
  
  //email validation
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  projectNameregex = /^[a-zA-Z0-9.,&_-]+$/;
  fullNameregex = /^[a-zA-Z0-9_]+$/;
  passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])(([A-Za-z\d@$!%*#?&])\2?(?!\2))+$/;
  
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
     this.resetForm(form); // reset form to be call
   },
   err => {
     //error in validation
     if (err.status == 422){
       this.serverErrorMessages = err.error.join('<br/>');
     }
     else
     //error in server side
     this.serverErrorMessages = 'Error in server side';

   }
 );
}
//reset the form
resetForm(form: NgForm){
  this.userService.selectedUser = {
    fullName: '',
    projectName:'',
    email: '',
    password:'',
    type_user:'',
  };
  form.resetForm();
  this.serverErrorMessages= '';
}
}
