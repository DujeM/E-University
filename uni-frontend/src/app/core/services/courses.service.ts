import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, NewCourse } from 'src/app/shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Course[]>('http://localhost:3000/courses');
  }

  get(id: string) {
    return this.httpClient.get<Course>(`http://localhost:3000/courses/${id}`);
  }

  create(data: NewCourse) {
    return this.httpClient.post<Course>('http://localhost:3000/courses', data);
  }

  edit(data: Course) {
    return this.httpClient.put<Course>(`http://localhost:3000/courses/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Course>(`http://localhost:3000/courses/${id}`);
  }
}
