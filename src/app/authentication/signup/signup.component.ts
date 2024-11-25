import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response.model'; // Correct import path

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}  // Inject Router here

  onSignup() {
    this.authService.signup(this.username, this.password).subscribe(
      (response: AuthResponse) => { // Explicitly typing the response
        alert('Signup successful: ' + response.message); // Handle the message from AuthResponse
        localStorage.setItem('token', response.token); // Store token in localStorage
        this.router.navigate(['/login']); // Redirect after successful signup
      },
      (error: any) => { // Handle error with explicit type
        alert('Signup failed: ' + error.message); // Display error message
      }
    );
  }
}
