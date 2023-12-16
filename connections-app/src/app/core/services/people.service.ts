import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPeopleListResponse } from '../models/people.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeopleList(): Observable<IPeopleListResponse> {
    return this.http.get<IPeopleListResponse>('https://tasks.app.rs.school/angular/users');
  }
}
