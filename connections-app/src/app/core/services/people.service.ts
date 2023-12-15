import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPeopleListResponse, IPerson, IPersonTransformed } from '../models/people.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  transformPersonInformation(peopleList: IPerson[]): IPersonTransformed[] {
    return peopleList.map((item) => ({
      name: item.name.S,
      uid: item.uid.S,
    }));
  }

  getPeopleList(): Observable<IPeopleListResponse> {
    return this.http.get<IPeopleListResponse>('https://tasks.app.rs.school/angular/users');
  }
}
