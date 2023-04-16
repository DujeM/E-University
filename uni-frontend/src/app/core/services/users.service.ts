import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';
import { NewUser, User, UserCourse } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  get(id: string) {
    return this.httpClient.get<User>(`http://localhost:3000/users/${id}`);
  }

  create(data: NewUser) {
    return this.httpClient.post<User>('http://localhost:3000/users', data);
  }

  edit(data: User) {
    return this.httpClient.put<User>(`http://localhost:3000/users/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<User>(`http://localhost:3000/users/${id}`);
  }

  courseEnroll(data: { userId: string, courseId: string }) {
    return this.httpClient.post<any>('http://localhost:3000/users/enroll', data);
  }

  getAllEntrolledCourses(id: string) {
    return this.httpClient.get<Course[]>(`http://localhost:3000/users/courses/${id}`);
  }

  removeEnrolledCourse(data: { userId: string, courseId: string }) {
    return this.httpClient.post<any>('http://localhost:3000/users/courses/remove', data);
  }
}
