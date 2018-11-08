import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { AdminComponent } from './user/admin/admin.component';
import { UserrequestComponent } from './userrequest/userrequest.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { from } from 'rxjs';

const appRoutes: Routes = [
{
    path: 'signup', component: SignUpComponent
},

{
    path: 'login', component: SignInComponent
    
},
{
    path: 'loginsuccess', component: LoginsuccessComponent,canActivate:[AuthGuard]
    
},
{
    path: 'welcome', component: UserComponent
},
{
    path: 'admin', component: AdminComponent
},
{
    path: 'userrequest', component: UserrequestComponent
},
{
    path: '', redirectTo: '/welcome', pathMatch: 'full'
}

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, 
            { enableTracing: true}
            )
        ],
        exports: [
            RouterModule
        ]
  })
export class AppRoutingModule {} 
