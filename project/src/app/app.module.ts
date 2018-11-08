//built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

//routes
import { AppRoutingModule } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
//authentication
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminComponent } from './user/admin/admin.component';
import { UserrequestComponent } from './userrequest/userrequest.component';
 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    LoginsuccessComponent,
    AdminComponent,
    UserrequestComponent,

  ],
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers:  [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
