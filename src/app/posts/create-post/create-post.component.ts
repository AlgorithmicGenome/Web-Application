import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
/*import { Router } from '@angular/router';*/
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  post = {id: '', title: '', content: '' };  // Define a post object to bind with the form
  isLoading: boolean = false;
  private mode: string = 'create';
  private postId: string = '';

  constructor(
    public postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = {id: post._id, title: post.title, content: post.content};
        });

      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm()
    } else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }
}


















/*
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post = { _id: '', title: '', content: '' }; // Initialize the post object
  isLoading: boolean = false;
  private mode: string = 'create'; // Mode can be 'create' or 'edit'
  private postId: string = ''; // Store the ID of the post

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private router: Router // Inject router for navigation
  ) {}

  ngOnInit() {
    // Subscribe to the route parameter map to check if we are in edit mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        // If postId exists, we are editing an existing post
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = { _id: post._id, title: post.title, content: post.content }; // Populate post data for editing
        });
      } else {
        // No postId, we are creating a new post
        this.mode = 'create';
        this.postId = '';
      }
    });
  }



  // Handles both create and update actions
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return; // Don't submit if form is invalid
    }
    this.isLoading = true; // Start loading indicator

    if (this.mode === 'create') {
      // Create a new post
      this.postService.addPost(form.value.title, form.value.content).subscribe(
        () => {
          this.router.navigate(['/posts']); // Navigate to posts after successful creation
          form.resetForm(); // Reset the form after submission
        },
        error => {
          console.error('Failed to create post:', error);
          this.isLoading = false; // Stop loading on error
        }
      );
    } else {
      // Update an existing post
      this.postService.updatePost(this.postId, form.value.title, form.value.content).subscribe(
        () => {
          this.router.navigate(['/posts']); // Navigate to posts after successful update
          form.resetForm(); // Reset the form after submission
        },
        error => {
          console.error('Failed to update post:', error);
          this.isLoading = false; // Stop loading on error
        }
      );
    }
  }
}
*/
