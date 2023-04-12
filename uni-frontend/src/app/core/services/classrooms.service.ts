import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom, NewClassroom } from 'src/app/shared/models/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Classroom[]>('http://localhost:3000/classrooms');
  }

  get(id: string) {
    return this.httpClient.get<Classroom>(`http://localhost:3000/classrooms/${id}`);
  }

  create(data: NewClassroom) {
    return this.httpClient.post<Classroom>('http://localhost:3000/classrooms', data);
  }

  edit(data: Classroom) {
    return this.httpClient.put<Classroom>(`http://localhost:3000/classrooms/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Classroom>(`http://localhost:3000/classrooms/${id}`);
  }
}
