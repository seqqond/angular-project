import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = []
  url: string = 'http://localhost:3000/posts'
  constructor(private http: HttpClient){}

  getPosts(): Observable<Post[]> {
    return this.http.get(this.url) as Observable<Post[]>
  }
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`) as Observable<any>
  }
  addItem(post: any): Observable<Post[]> {
    return this.http.post<Post[]>(this.url, post);
  }
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }
  updatePost(post: Post): Observable<any>{
    return this.http.put(`${this.url}/${post.id}`, post) as Observable<any>
  }
}
