import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  post: Post = {
    id: '',
    title: '',
    content: '',
    name: '',
    email: '',
    phone: '',
  };
  isLoading: boolean = false;
  mode: string = 'create';
  private postId: string = '';

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = <string>paramMap.get('postId');

        this.isLoading = true;
        this.postService.getPostById(this.postId).subscribe((post: any) => {
          this.isLoading = false;
          this.post = {
            id: post._id,
            title: post.title,
            content: post.content,
            name: post.name,
            email: post.email,
            phone: post.phone,
            created: post.created,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    this.isLoading = true;
    if (this.mode === 'create') {
      if (form.invalid) {
        return;
      }
      const data = {
        id: '',
        title: form.value.title,
        content: form.value.content,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
      };
      this.postService.addPost(data);
      form.resetForm();
    } else {
      const data = {
        id: this.postId,
        title: form.value.title || this.post.title,
        content: form.value.content || this.post.content,
        name: form.value.name || this.post.name,
        email: this.post.email,
        phone: form.value.phone || this.post.phone,
      };
      this.postService.updatePost(data);
    }
  }
}
