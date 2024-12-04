import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from "../post.model";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];  // Initialize with empty posts.js
  isLoading: boolean = false;
  userIsAuthenticated: boolean = false;
  private postSub: Subscription = new Subscription();
  private authStatusSub: Subscription = new Subscription();

  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    // Initial check for authentication status
    this.userIsAuthenticated = this.authService.getIsAuth();

    // Subscribe to authentication status updates
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((status: boolean) => {
      this.userIsAuthenticated = status;
      if (status) {
        this.loadPosts();  // If authenticated, load posts.js
      }
    });

    if (this.userIsAuthenticated) {
      this.loadPosts();  // If already authenticated on page load, fetch posts.js
    }
  }

  loadPosts() {
    this.isLoading = true;
    this.postService.getPosts();  // Fetch posts.js from the service
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;  // Update posts.js in the component with fetched posts.js
    });
  }

  onAddPost(newPost: Post) {
    this.postService.addPost(newPost.title, newPost.content);  // Call service to add new post
    // Optionally, you can add the new post to the local array immediately without waiting for response.
    this.posts.push(newPost);
  }

  onDelete(id: string) {
    this.postService.deletePost(id); // Call service to delete post
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
