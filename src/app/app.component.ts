import { Component, OnInit } from '@angular/core';
/*import { Router } from '@angular/router';*/
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private authService: AuthService) {}
  /*isAuthenticated = false;*/

  /*constructor(private authService: AuthService, private router: Router) {}*/

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}

  /*// Navigate to Post List page
  goToPostList() {
    this.router.navigate(['/']);
  }

  // Navigate to New Post page
  goToCreatePost() {
    this.router.navigate(['/create']);
  }

  // Handle Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to Login page
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to Signup page
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}*/
