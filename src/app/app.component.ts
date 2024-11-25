import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Check if the user is authenticated when the app starts
    this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    // Auto-authenticate user if token exists
    this.authService.autoAuthUser();
  }

  // Logout functionality
  onLogout() {
    this.authService.logout();
  }

  // Redirect to Posts page
  onGoToPosts() {
    this.router.navigate(['/posts']);
  }

  // Redirect to New Post page
  onGoToNewPost() {
    this.router.navigate(['/create-post']);
  }

  // Navigate to Login page
  onLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to Signup page
  onSignup() {
    this.router.navigate(['/signup']);
  }
}
