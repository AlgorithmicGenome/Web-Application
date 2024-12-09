import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub!: Subscription;

  showLoginForm = false;
  loginEmail = '';
  loginPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogin() {
    if (this.loginEmail && this.loginPassword) {
      this.authService.login(this.loginEmail, this.loginPassword);
      this.showLoginForm = false;
      this.loginEmail = '';
      this.loginPassword = '';
    } else {
      alert('Please enter valid credentials!');
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authListenerSub) {
      this.authListenerSub.unsubscribe();
    }
  }
}
