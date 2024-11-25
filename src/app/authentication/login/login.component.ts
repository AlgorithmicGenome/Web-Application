import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response.model'; // Correct import path;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

// Inject AuthService, not PostService
  constructor(private authService: AuthService, private router: Router) {}  // Inject Router here

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
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


