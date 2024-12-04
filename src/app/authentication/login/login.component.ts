import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login.js',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = false;
  errorMessage: string = ''; // To display error messages to the user

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form:', form);
      return;
    }

    console.log('Form Submitted:', form.value);
    this.isLoading = true;

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; // Default redirect route after login.js

    // Call login.js service method
    this.authService.login(form.value.email, form.value.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        // Store the token received from the backend (use localStorage or any other method)
        localStorage.setItem('authToken', response.token);
        // Redirect the user to the desired route
        this.router.navigate([returnUrl]);
      },
      (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        // Handle error message
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
      }
    );
  }
}
