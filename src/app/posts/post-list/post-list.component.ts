import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from "../../models/post.model";
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

  constructor(public postService: PostService, private authService: AuthService) {
  this.postSub = new Subscription();
  this.authStatusSub = this.authService.getAuthStatusListener().subscribe((status: boolean) => {
    this.userIsAuthenticated = status;
  });
}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost();
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe( (status:boolean)=>{
      this.userIsAuthenticated = status;
    });
  }


  /*onAddPost(newPost: Post) {
    this.postService.addPost(newPost.title, newPost.content);  // Call service to add new post
    // Optionally, you can add the new post to the local array immediately without waiting for response.
    this.posts.push(newPost);
  }*/

  onDelete(id: string) {
    this.postService.deletePost(id); // Call service to delete post
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
