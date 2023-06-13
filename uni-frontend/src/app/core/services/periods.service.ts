import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Period, NewPeriod } from 'src/app/shared/models/period.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Period[]>('http://localhost:3000/periods');
  }

  get(id: string) {
    return this.httpClient.get<Period>(`http://localhost:3000/periods/${id}`);
  }

  create(data: NewPeriod) {
    return this.httpClient.post<Period>('http://localhost:3000/periods', data);
  }

  edit(data: Period) {
    return this.httpClient.put<Period>(`http://localhost:3000/periods/${data.id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<Period>(`http://localhost:3000/periods/${id}`);
  }
}
