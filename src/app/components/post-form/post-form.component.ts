/*
/!**!/import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post = { title: '', content: '' };  // Initialize the post object with title and content
  isLoading = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // Initialize any additional logic here if needed
  }

  onAddPost(postForm: any): void {
    this.isLoading = true; // Set loading state

    // Call post service to add or update post
    this.postService.addPost(postForm.value.title, postForm.value.content).subscribe(
      response => {
        this.isLoading = false; // Reset loading state
        this.router.navigate(['/posts']);
      },
      error => {
        console.error('Error occurred while adding post:', error);
        this.isLoading = false;
      }
    );
  }
}
*/
