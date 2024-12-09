import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup.js',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false; // Tracks loading state for UX feedback

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    // Check if the form is valid before submission
    if (form.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    this.isLoading = true; // Start loading indicator

    // Call the service to create a new user
    this.authService.createUser(form.value.email, form.value.password);

    // Optionally reset the form and loading state
    form.resetForm();
    this.isLoading = false;
  }
}
