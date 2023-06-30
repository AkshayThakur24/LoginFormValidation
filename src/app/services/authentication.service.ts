import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { from, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { GoogleAuthProvider,FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth,private router: Router,private http:HttpClient,public afAuth: AngularFireAuth ){}
  login(username : string,password:string){
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }
  logout(){
    return  from(this.auth.signOut());
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth(){
    return this.AuthLogin(new FacebookAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signUp(name:string,email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({user})=>updateProfile(user,{displayName:name}))
    )
  }

  
  
 
}





  

