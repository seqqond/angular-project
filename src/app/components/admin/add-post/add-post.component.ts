import { HttpHeaders } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {
  formattedDate: string
  constructor(
    private postService: PostsService, 
    private authService: AuthService
    ){
    const currentDateTime = new Date();
    this.formattedDate = this.formatDate(currentDateTime);
  }
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
addNewPost: FormGroup = new FormGroup({
  title: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.minLength(5)]),
  content: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.minLength(10)]),
})

get titleForm(){
  return this.addNewPost.controls['title']
}
get contentForm(){
  return this.addNewPost.controls['content']
}



  add(){
    const user = this.authService.getUser();
    if (!user) {
      console.error('No user is currently logged in');
      return;
    }
    const titleValue = this.addNewPost.get('title')?.value || ''
    const contentValue = this.addNewPost.get('content')?.value || ''
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const newPost = new Post(0, user.email, titleValue, this.formatDate(), contentValue)
    this.postService.addItem(newPost).subscribe({
      next: (addedPost) => {
        console.log("Added post:", addedPost);
      },
      error: (err) => {
        console.error("Error adding post:", err);
      }
    });
  }


  formatDate(date: Date = new Date()): string {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}:${seconds}`;
  }

}
