import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  getPost() {
    return this.http
      .get<{ success: boolean; data: any }>('http://localhost:3000/api/posts', {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((postData) => {
          return postData.data.map((payLoad: any) => ({
            title: payLoad.title,
            content: payLoad.content,
            id: payLoad._id,
            name: payLoad.name,
            email: payLoad.email,
            phone: payLoad.phone,
          }));
        })
      )
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postUpdated.next([...this.posts]);
      });
  }

  addPost(data: Post) {
    const userData = this.authService.getUserData();
    const postData = {
      ...data,
      email: userData.email,
    };

    this.http
      .post<{ success: boolean }>(
        'http://localhost:3000/api/posts/create',
        postData,
        {
          headers: this.getAuthHeaders(),
        }
      )
      .subscribe({
        next: () => {
          this.posts.push(data);
          this.postUpdated.next([...this.posts]);
          this.router
            .navigate(['/'])
            .then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error in POST request', error),
      });
  }

  getPostById(postId: string) {
    return this.http.get<{ success: boolean; data: any }>(
      `http://localhost:3000/api/posts/${postId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updatePost(data: Post) {
    this.http
      .put<{ success: boolean }>(
        `http://localhost:3000/api/posts/${data.id}`,
        data,
        { headers: this.getAuthHeaders() }
      )
      .subscribe({
        next: () => {
          this.posts = [...this.posts];
          this.postUpdated.next([...this.posts]);
          this.router
            .navigate(['/'])
            .then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error updating post', error),
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== postId);
          this.postUpdated.next([...this.posts]);
          this.router
            .navigate(['/'])
            .then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error deleting post', error),
      });
  }
}
