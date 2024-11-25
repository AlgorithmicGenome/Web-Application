import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model'; // Import the AuthResponse interface

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Adjust the API URL if needed
  private token: string = '';
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Getter for the token
  getToken(): string {
    return this.token;
  }

  // Getter for the authentication status
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // Observable for components to subscribe to auth status changes
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Signup method
  signup(email: string, password: string): Observable<AuthResponse> {  // Return an observable of type AuthResponse
    const authData = { email, password };
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/signup`, authData); // Return observable to be subscribed in component
  }

  // Login method
  login(email: string, password: string): Observable<any> {  // Ensure it returns an Observable
    const authData = { email, password };
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login`, authData); // Return the observable
  }


  // Logout method
  logout(): void {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    localStorage.removeItem('token'); // Clear token from localStorage
    this.router.navigate(['/login']); // Redirect to login
  }

  // Auto-authenticate based on token in localStorage
  autoAuthUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }
}
