import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsPageComponent } from './components/admin/posts-page/posts-page.component';
import { PostPageComponent } from './components/admin/post-page/post-page.component';
import { LoginPageComponent } from './components/admin/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { FooterComponent } from './components/admin/footer/footer.component';
import { ContentComponent } from './components/admin/content/content.component';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { NotFoundPageComponent } from './components/admin/not-found-page/not-found-page.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { RegisterPageComponent } from './components/admin/register-page/register-page.component';
import { HomePageComponent } from './components/client/home-page/home-page.component';
import { PostPageClientComponent } from './components/client/post-page-client/post-page-client.component';
import { ClientPostsComponent } from './components/client/client-posts/client-posts.component';
import { ClientLayoutComponent } from './components/client/client-layout/client-layout.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { StripHtmlPipe } from './strip-html.pipe';

@NgModule({
  declarations: [
    StripHtmlPipe,
    AppComponent,
    PostsPageComponent,
    PostPageComponent,
    LoginPageComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AddPostComponent,
    NotFoundPageComponent,
    AdminPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    PostPageClientComponent,
    ClientPostsComponent,
    ClientLayoutComponent,
    ClientHeaderComponent,
    StripHtmlPipe
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
