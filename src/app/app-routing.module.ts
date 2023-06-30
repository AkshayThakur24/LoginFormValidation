import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
{path:'',component:AuthComponent},
{path:'home',component:HomeComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'verify-email',component:VerifyEmailComponent},
{path:'signup',component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
