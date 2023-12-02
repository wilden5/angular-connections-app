import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUserAuthenticated, IUserProfileInformation } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  public previousEnteredEmail = new BehaviorSubject<string>('initialValue');

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const userHeaders = JSON.parse(localStorage.getItem('userObject')!);
    return new HttpHeaders({
      'rs-uid': userHeaders.uid,
      'rs-email': userHeaders.email,
      authorization: `Bearer ${userHeaders.token}`,
    });
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('https://tasks.app.rs.school/angular/registration', user);
  }

  login(user: IUser): Observable<IUserAuthenticated> {
    return this.http.post<IUserAuthenticated>('https://tasks.app.rs.school/angular/login', user);
  }

  getProfileInformation(): Observable<IUserProfileInformation> {
    const headers = this.getAuthHeaders();
    return this.http.get<IUserProfileInformation>('https://tasks.app.rs.school/angular/profile', {
      headers,
    });
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userObject');
  }
}
