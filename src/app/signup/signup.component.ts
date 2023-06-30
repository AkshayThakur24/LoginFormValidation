import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch:true,
      }
      
    }

    return null;


  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  Form:FormGroup;

  constructor(private fb:FormBuilder, public authService:AuthenticationService,private router: Router,private afAuth:AngularFireAuth,private toast:HotToastService){}

  onModeSwitch(){
    this.router.navigateByUrl('forgot-password')
  }

  ngOnInit(): void {
      this.Form=this.fb.group({
        name:['',Validators.required],
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required]],
        confirmPassword: ['',Validators.required]
      },{validators:passwordMatchValidator()});
  }

  onSubmit(){


    const {name,email,password,confirmPassword} = this.Form.value;
    if(!this.Form.valid && password !=confirmPassword)
    return
    if( password !=confirmPassword)
    alert("Passwords should match")
    

    
    this.authService.signUp(name,email,password).pipe(
      this.toast.observe({
        success:'Congrats You are all signed up!!',
        loading:'Signing in ',
        error: ({message})=> message
      })
    ).subscribe(()=>{
      this.router.navigateByUrl('home');
    })

  }

  get email() {
    return this.Form.get('email');

  }

  get name(){
    return this.Form.get('name');
  }
  get password(){
    return this.Form.get('password');
  }
  get confirmPassword(){
    return this.Form.get('confirmPassword');
  }

  
  

}
