import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
{
    path: 'signup', component: SignUpComponent
},

{
    path: 'login', component: SignInComponent
    
},

{
    path: 'welcome', component: UserComponent
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
