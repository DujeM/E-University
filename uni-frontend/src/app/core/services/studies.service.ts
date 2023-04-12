import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewStudy, Study } from 'src/app/shared/models/study.model';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Study[]>('http://localhost:3000/studies');
  }

  get(id: string) {
    return this.httpClient.get<Study>(`http://localhost:3000/studies/${id}`);
  }

  create(data: NewStudy) {
    return this.httpClient.post<Study>('http://localhost:3000/studies', data);
  }

  edit(data: Study) {
    return this.httpClient.put<Study>(`http://localhost:3000/studies/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Study>(`http://localhost:3000/studies/${id}`);
  }
}
