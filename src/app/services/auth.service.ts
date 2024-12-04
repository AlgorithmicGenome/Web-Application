import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";  // <-- Add this import for Observable
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })

export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user/login'; // Ensure this is correct
  private isAuthenticated: boolean = false; // TODO: Flip this to true to bypass auth
  private authStatusListener = new Subject<boolean>();
  private token: string | null = null;
  private tokenTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient, private router: Router) {}

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
    const authData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(res => {
        console.log(res);
      });
  }

  login(email: string, password: string): Observable<{ token: string; expiresIn: number }> {
    const authData = { email: email, password: password };

    // This is a hack to get the isAuthenticated flag set to true on login
    this.isAuthenticated = true

    // Now this returns an Observable
    return this.http.post<{ token: string; expiresIn: number }>(
      "http://localhost:3000/api/user/login",
      authData
    )
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expirationDate.getTime() - new Date().getTime();
    if(expiresIn > 0){
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
    localStorage.setItem('authToken', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('authToken');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
