import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IUserProfileInformation,
  IUserRegistration,
  IUserAuthenticated,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  public previousEnteredEmail = new BehaviorSubject<string>('initialValue');

  constructor(private http: HttpClient) {}

  register(user: IUserRegistration): Observable<IUserRegistration> {
    return this.http.post<IUserRegistration>(
      'https://tasks.app.rs.school/angular/registration',
      user
    );
  }

  login(user: IUserRegistration): Observable<IUserAuthenticated> {
    return this.http.post<IUserAuthenticated>('https://tasks.app.rs.school/angular/login', user);
  }

  getProfileInformation(): Observable<IUserProfileInformation> {
    return this.http.get<IUserProfileInformation>('https://tasks.app.rs.school/angular/profile');
  }

  updateProfileName(name: string): Observable<void> {
    return this.http.put<void>('https://tasks.app.rs.school/angular/profile', { name });
  }

  logout(): Observable<void> {
    return this.http.delete<void>('https://tasks.app.rs.school/angular/logout');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userObject');
  }
}
