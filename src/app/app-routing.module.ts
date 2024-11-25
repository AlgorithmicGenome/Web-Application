import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {CreatePostComponent} from "./posts/create-post/create-post.component";
import { NewPostComponent } from './new-post/new-post.component'; // Replace with actual path
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './services/auth.guard';

/*export interface Option {
  name: string;
  action?: () => void; // Optional action for each chip
}*/
const routes: Routes = [
  {path:'', component: PostListComponent},
  {path:'create', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path:'edit/:postId', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

/*/!*{path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route*!/
  { path: '', redirectTo: '/posts', pathMatch: 'full' }, // Default roun3
  { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
/!*
  {path: 'new-post', component: PostFormComponent },
*!/
  {path:'create', component: CreatePostComponent},
/!*
  {path:'edit/:postId', component: PostFormComponent},
*!/
  {path:'edit/:postId', component: CreatePostComponent},
  { path: '', component: PostListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

];*/
