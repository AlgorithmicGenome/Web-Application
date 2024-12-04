import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';  // Assuming you have a Post model

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); // Subject for notifying post updates

  constructor(private http: HttpClient, private router: Router) {}

  // Method to get all posts.js
  getPosts(): void {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<Post[]>('http://localhost:3000/api/posts', { headers })
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]); // Notify listeners with the updated posts.js
      });
  }

  // Method to get a post by ID for editing
  getPostById(postId: string): Observable<any> {
    // TODO: this needs auth headers
    return this.http.get<any>(`http://localhost:3000/api/posts/${postId}`);
  }

  // Method to add a new post
  addPost(title: string, content: string): Observable<any> {
    const post = { title, content };

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return new Observable();
    }

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<any>('http://localhost:3000/api/posts', post, { headers });
  }

  // Method to update a post
  updatePost(postId: string, title: string, content: string): Observable<any> {
    const post = { title, content };

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return new Observable();
    }

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put<any>(`http://localhost:3000/api/posts/${postId}`, post, { headers });
  }

  // Method to delete a post
  deletePost(postId: string): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete(`http://localhost:3000/api/posts/${postId}`, { headers })
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);  // Remove the deleted post from the local posts.js array
        this.postsUpdated.next([...this.posts]);  // Notify listeners about the updated posts.js list
      });
  }

  // Method to get the posts.js update listener (for subscribing to post changes)
  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }
}
