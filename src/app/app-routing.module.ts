import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { authGuard } from './services/auth.guard'; // Correct the path if needed


const routes: Routes = [
  { path: '', component: PostListComponent }, // Public: List posts.js
  { path: 'create', component: CreatePostComponent, canActivate: [ authGuard] },
  { path: 'edit/:postId', component: CreatePostComponent, canActivate: [authGuard] }, // Protected: Edit posts.js
  { path: 'login', component: LoginComponent }, // Public: Login
  { path: 'signup', component: SignupComponent }, // Public: Signup
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard: Redirect invalid routes to home
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
