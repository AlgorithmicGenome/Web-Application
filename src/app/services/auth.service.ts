import { Injectable } from "@angular/core";
import { AuthData } from "../authentication/auth-data.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })

export class AuthService {
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private token: string | null = null;
  private tokenTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  /*getPost() {
    const token = this.getToken();
    if (!token) {
      console.log('No token found. User might not be logged in');
      return;
    }

    return this.http.get('http://localhost:3000/api/posts', {
      headers: {
        Authorization: `Bearer ${token}` // Attach the token
      }
    });
  }*/


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe((res) => {
      console.log(res);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    console.log('Login payload being sent:', authData); // Debugging line

    this.http.post<{ token: string; expiresIn: number }>(
      "http://localhost:3000/api/user/login",
      authData
    ).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Log server's response
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.token = token;
          this.authStatusListener.next(true);
          const now = new Date();
          this.saveAuthData(this.getToken() as string, new Date(now.getTime() + expiresInDuration * 1000));
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
    this.router.navigate(['/']).then(() => {
      console.log('Navigation successful after logout.');
    }).catch(err => {
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

  private setAuthTimer(expDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString()); // to serialize the date object
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = this.getToken();
    const expirationDate = localStorage.getItem("expiration");

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate), // turn it back into a Date type
    };
  }
}
