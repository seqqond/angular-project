import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-client-posts',
  templateUrl: './client-posts.component.html',
  styleUrls: ['./client-posts.component.css']
})
export class ClientPostsComponent {
  constructor(
    private postService: PostsService,
    private router: Router
  ){}
  parseDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  posts: Post[] = []
  ngOnInit(): void{
    this.postService.getPosts().subscribe({
      next: posts => {
        this.posts = posts.map(post => ({
          ...post,
          date: this.parseDate(post.date)
        }))
      },
      error: err => console.log(err)
    })
  }
  open(id: number){
    this.postService.getPost(id).subscribe({
      next: () => this.router.navigate(['home/post', id])
    })
  }
}
