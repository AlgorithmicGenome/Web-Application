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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

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
          }));
        })
      )
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postUpdated.next([...this.posts]);
      });
  }

  /**
   * Function to add a new post
   */
  addPost(id: string, name: string, email: string, phone: string, title: string, content: string) {
    const post: Post = {
      id: '',
      name: 'name',
      title: 'title',
      content: 'content',
      email: 'email',
      phone: 'phone',
      photo: 'photo',
      created: new Date(),
    };

    console.log('Sending POST request with payload:', post);

    this.http
      .post<{ success: boolean }>(
        'http://localhost:3000/api/add',
        post,
        { headers: this.getAuthHeaders() }
      )
      .subscribe({
        next: () => {
          console.log('Post successfully added');
          this.posts.push(post);
          this.postUpdated.next([...this.posts]);
          this.router.navigate(['/']).then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error in POST request', error),
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post = { id, title, content };

    this.http
      .put<{ success: boolean }>(
        `http://localhost:3000/api/posts/${id}`,
        post,
        { headers: this.getAuthHeaders() }
      )
      .subscribe({
        next: () => {
          console.log('Post updated');
          this.posts = [...this.posts];
          this.postUpdated.next([...this.posts]);
          this.router.navigate(['/']).then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error updating post', error),
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => {
          console.log('Post deleted');
          this.posts = this.posts.filter((post) => post.id !== postId);
          this.postUpdated.next([...this.posts]);
          this.router.navigate(['/']).then(() => console.log('Navigation completed successfully'));
        },
        error: (error) => console.error('Error deleting post', error),
      });
  }
}
