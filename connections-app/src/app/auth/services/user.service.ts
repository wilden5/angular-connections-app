import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUserAuthenticated } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  public previousEnteredEmail = new BehaviorSubject<string>('initialValue');

  constructor(private http: HttpClient) {}

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://tasks.app.rs.school/angular/registration', user);
  }

  login(user: IUser): Observable<IUserAuthenticated> {
    return this.http.post<IUserAuthenticated>('https://tasks.app.rs.school/angular/login', user);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userAuthToken');
  }
}
