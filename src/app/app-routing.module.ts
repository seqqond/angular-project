import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { HomePageComponent } from './components/client/home-page/home-page.component';
import { LoginPageComponent } from './components/admin/login-page/login-page.component';
import { NotFoundPageComponent } from './components/admin/not-found-page/not-found-page.component';
import { PostPageComponent } from './components/admin/post-page/post-page.component';
import { PostsPageComponent } from './components/admin/posts-page/posts-page.component';
import { RegisterPageComponent } from './components/admin/register-page/register-page.component';
import { AuthGuard } from './guard/auth.guard';
import { ClientPostsComponent } from './components/client/client-posts/client-posts.component';
import { PostPageClientComponent } from './components/client/post-page-client/post-page-client.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/posts', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, children: [
    { path: 'posts', component: ClientPostsComponent },
    { path: 'post/:id', component: PostPageClientComponent }
  ]},
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], children: [
      {
        path: '', canActivateChild: [AuthGuard], children: [
          { path: 'posts', component: PostsPageComponent },
          { path: 'post/:id', component: PostPageComponent },
          { path: 'add', component: AddPostComponent }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
