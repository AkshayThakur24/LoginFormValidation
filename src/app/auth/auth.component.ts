import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


import 'firebase/auth';
import {  FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  
  Form:FormGroup;

  constructor(private fb:FormBuilder, public authService:AuthenticationService,private router: Router,private toast:HotToastService,private afAuth:AngularFireAuth){}

  onModeSwitch(){
    this.router.navigateByUrl('forgot-password')
  }

  ngOnInit(): void {
      this.Form=this.fb.group({
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required]]
      });
  }

  onSubmit(){
    if(!this.Form.valid){
      return;
    }
    const {email,password} = this.Form.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success:'Logged in successfully',
        loading:"Logging in....",
        error:"There was an error"
      })
    ).subscribe(()=>{
      this.router.navigateByUrl('home');
      
      
    })
  }

  get email() {
    return this.Form.get('email');

  }

  signInWithGoogle(){
    this.authService.GoogleAuth();
  }
  

  
  

  

}
