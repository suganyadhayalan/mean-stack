import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    projectName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }
  postUser(user: User)
  {
    return this.http.post(environment.apiBaseUrl+'/register',user);
    //pass the url detail of new user, nodejs-register to be call
  }

  login(authCredentails) {
    return this.http.post(environment.apiBaseUrl + '*/authenticate', authCredentails);
  }

  setToken(token: string) {
     localStorage.setItem('token', token);
  }


}
