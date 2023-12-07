import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPeopleList, IPerson, IPersonTransformed } from '../models/people.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  transformPersonInformation(peopleList: IPerson[]): IPersonTransformed[] {
    return peopleList.map((item) => ({
      name: item.name.S,
      uid: item.uid.S,
    }));
  }

  getPeopleList(): Observable<IPeopleList> {
    return this.http.get<IPeopleList>('https://tasks.app.rs.school/angular/users');
  }
}
