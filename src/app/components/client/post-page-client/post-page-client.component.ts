import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-page-client',
  templateUrl: './post-page-client.component.html',
  styleUrls: ['./post-page-client.component.css']
})
export class PostPageClientComponent {
post!: Post
constructor(
  private postsService: PostsService,
  private location: Location,
  private route: ActivatedRoute
){}
getPost(id: number){
  return this.postsService.getPost(id).subscribe(post => {
    this.post = post
  })
}
stripHtml(html: string): string {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
}
ngOnInit(): void{
  const id = +this.route.snapshot.paramMap.get('id')!
  this.getPost(id)
}
return(){
  this.location.back()
}
}
