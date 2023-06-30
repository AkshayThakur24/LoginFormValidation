import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string;
  successMessage: string;
  errorMessage: string;

  constructor(private afAuth: AngularFireAuth) {}

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.successMessage = 'Password reset email sent. Please check your inbox.';
        this.errorMessage = null;
      })
      .catch((error) => {
        this.successMessage = null;
        this.errorMessage = error.message;
      });
  }

  
}
  


