import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';  // Correct import
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  post = { title: '', content: '' };  // Define a post object to bind with the form
  isLoading: boolean = false;
  public mode: string = 'create';  // Mode for either creating or editing
  private postId: string = '';     // Holds the postId for edit mode

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe(post => {
          this.isLoading = false;
          this.post = { title: post.title, content: post.content };
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

    console.log('Form values:', form.value); // Log form values to the console
    this.isLoading = true;

    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/']); // Navigate after posting
        },
        (error) => {
          console.error('Error adding post:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/']); // Navigate after updating the post
        },
        (error) => {
          console.error('Error updating post:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
