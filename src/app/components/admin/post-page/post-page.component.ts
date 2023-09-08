import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})

export class PostPageComponent {
  post!: Post
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  }
noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  posts: Post[] = []
  editId!: number
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ){}
  postPageForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.minLength(5)]),
    content: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.minLength(10)])
  })
  
    ngOnInit(){
      const id = this.route.snapshot.params['id']
      this.postsService.getPost(id).subscribe((post: Post) => {
        this.post = post
        this.postPageForm.controls['title'].setValue(post.title)
        this.postPageForm.controls['content'].setValue(post.content)
      })
      this.postsService.getPosts().subscribe(posts => this.posts = posts)
    }
    edit(post: Post){
      post.title = this.titleForm.value
      post.content = this.contentForm.value
      this.editId = post.id
      this.postsService.updatePost(post).subscribe({
        next: (updatedPost: Post) => {
          this.post = updatedPost
        },
        error: (err: any) => {
          console.log(err)
          
        }
      })
    }
    get titleForm(){
      return this.postPageForm.controls['title']
    }
    get contentForm(){
      return this.postPageForm.controls['content']
    }

}
