import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';

import { CreatePostComponent } from './posts/create-post/create-post.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PostListComponent } from './posts/post-list/post-list.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
/*
import { PostFormComponent } from './components/post-form/post-form.component';
*/
import {PostService} from "./posts/post.service";
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';  // Correct import path
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from './posts/posts.component';
import { NewPostComponent } from './new-post/new-post.component'; // Optional: If you're using icons like in the example







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreatePostComponent,
    PostListComponent,
    /*PostFormComponent,*/
    LoginComponent,
    SignupComponent,
    PostsComponent,
    NewPostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /*angular material imports*/
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatExpansionModule, CommonModule, MatProgressSpinnerModule, HttpClientModule, MatChipsModule, MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
