import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IServerProfileInformation,
  IUser,
  IUserAuthenticated,
  IUserProfileInformation,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  public previousEnteredEmail = new BehaviorSubject<string>('initialValue');

  constructor(private http: HttpClient) {}

  transformProfileInformation(data: IServerProfileInformation): IUserProfileInformation {
    return {
      createdAt: data.createdAt.S,
      uid: data.uid.S,
      email: data.email.S,
      name: data.name.S,
    };
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://tasks.app.rs.school/angular/registration', user);
  }

  login(user: IUser): Observable<IUserAuthenticated> {
    return this.http.post<IUserAuthenticated>('https://tasks.app.rs.school/angular/login', user);
  }

  getProfileInformation(): Observable<IServerProfileInformation> {
    return this.http.get<IServerProfileInformation>('https://tasks.app.rs.school/angular/profile');
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
