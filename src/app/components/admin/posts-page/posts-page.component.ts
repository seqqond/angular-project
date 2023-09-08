import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent {
  posts: Post[] = []
  isDeleting: boolean = false
  deletedId!: number
  constructor(
    private postService: PostsService,
    private router: Router
    ){}
  
  getPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data
      }, 
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    })
  }
  ngOnInit(): void{
  this.getPosts()
  }
  delete(id: number){
    this.isDeleting = true
    this.deletedId = id
    this.postService.deleteItem(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id)
      this.isDeleting = false
    })
  }
  openPost(id: number){
    this.router.navigate(['admin/post', id])
  }
}
