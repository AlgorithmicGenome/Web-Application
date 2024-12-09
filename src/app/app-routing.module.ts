import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { authGuard } from './services/auth.guard';
import { StlouisfedComponent } from './stlouisfed/stlouisfed.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'stlouisfed', component: StlouisfedComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [authGuard] },
  {
    path: 'edit/:postId',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
