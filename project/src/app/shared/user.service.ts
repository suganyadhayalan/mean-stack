//connecting nodejs code to angular

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
    password: '',
    type_user: ''
    //value_flag: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //http method
  postUser(user: User)
  {
    //return this.http.post(environment.apiBaseUrl + '/dbconnection', user,this.noAuthHeader);
    return this.http.post(environment.apiBaseUrl + '/register', user,this.noAuthHeader);
    //return this.http.post(environment.apiBaseUrl + '/register' + '/dbconnection', user,this.noAuthHeader);
    //pass the url detail of new user, nodejs-register to be call
  }
/*
  postUsers(user: User)
  {
    return this.http.post(environment.apiBaseUrl + '/registers', user,this.noAuthHeader);
  }
*/
  acceptuser(user: User)
  {
    return this.http.post(environment.apiBaseUrl + '/acceptuser', user,this.noAuthHeader);
  }
  login(authCredentails) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentails,this.noAuthHeader);
  }

  admin(authCredentails) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentails,this.noAuthHeader);
  }

  getloginsuccess() {
    return this.http.get(environment.apiBaseUrl + '/loginsuccess');
  }

  getuserrequest() {
    return this.http.get(environment.apiBaseUrl + '/userrequest');
  }
  /*
  getuserrequests(user: User) {
    return this.http.get(environment.apiBaseUrl + '/userrequests');
  }
  */

  /* 
  getuserrequest() {
    return this.http.get(environment.apiBaseUrl + '/userrequest');
  }

  */
  //helper method
  setToken(token: string) {
     localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000; //check the expire of payload 
    else
      return false;
  }


}
