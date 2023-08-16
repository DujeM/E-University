import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Period, NewPeriod } from 'src/app/shared/models/period.model';
import { NewPost, Post } from 'src/app/shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Post[]>('http://localhost:3000/posts');
  }

  get(id: string) {
    return this.httpClient.get<Post>(`http://localhost:3000/posts/${id}`);
  }

  create(data: NewPost) {
    return this.httpClient.post<Post>('http://localhost:3000/posts', data);
  }

  edit(data: Post) {
    return this.httpClient.put<Post>(`http://localhost:3000/posts/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Post>(`http://localhost:3000/posts/${id}`);
  }
}
