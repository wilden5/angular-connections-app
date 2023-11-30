import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://tasks.app.rs.school/angular/registration', user);
  }
}
