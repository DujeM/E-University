import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, NewEvent } from 'src/app/shared/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Event[]>('http://localhost:3000/events');
  }

  get(id: string) {
    return this.httpClient.get<Event>(`http://localhost:3000/events/${id}`);
  }

  getPersonal(userId: string) {
    return this.httpClient.get<Event[]>(`http://localhost:3000/events/personal/${userId}`);
  }

  create(data: NewEvent) {
    return this.httpClient.post<Event>('http://localhost:3000/events', data);
  }

  edit(data: Event) {
    return this.httpClient.put<Event>(`http://localhost:3000/events/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Event>(`http://localhost:3000/events/${id}`);
  }

  getAllByDay(day: number) {
    return this.httpClient.get<Event[]>(`http://localhost:3000/events/day/${day}`);
  }
}
