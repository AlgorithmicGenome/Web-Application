import { Injectable } from '@angular/core';
import { AuthData } from '../authentication/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private token: string | null = null;
  private tokenTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token') || null;
  }

  getIsAuth() {
    const authInfo = this.getAuthData();
    this.isAuthenticated = !!authInfo;
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((res) => {
        console.log('Signup response:', res);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http
      .post<{
        token: string;
        expiresIn: number;
        user: {
          _id: string;
          email: string;
          __v: number;
        };
      }>('http://localhost:3000/api/user/login', authData)
      .subscribe({
        next: (response) => {
          console.log('Login response:', response);
          if (!response) {
            return;
          }
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.token = token;
            this.authStatusListener.next(true);
            const now = new Date();
            this.saveAuthData(
              this.getToken() as string,
              new Date(now.getTime() + expiresInDuration * 1000)
            );
            this.router.navigate(['/']).then(() => {
              console.log('Navigation successful after login.');
            });
          }
        },
        error: (error) => {
          console.error('Login error:', error); // Log the HTTP error
        },
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
    this.clearAuthData();
    this.router
      .navigate(['/'])
      .then(() => {
        console.log('Navigation successful after logout.');
      })
      .catch((err) => {
        console.error('Navigation error after logout:', err);
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData(); // returns json token and expDate
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expirationDate.getTime() - new Date().getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); // since AuthTime is in seconds
      this.authStatusListener.next(true);
    }
  }

  getUserData() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    return JSON.parse(user);
  }

  private setAuthTimer(expDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString()); // to serialize the date object
  }

  private clearAuthData() {
    localStorage.clear();
  }

  private getAuthData() {
    const token = this.getToken();
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
