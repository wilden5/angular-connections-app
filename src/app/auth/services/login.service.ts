import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userCredentials'));

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(credentials: IUser): void {
    if (credentials.email && credentials.password) {
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      this.router.navigate(['/']);
      this.isLoggedInSubject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('userCredentials');
    this.router.navigate(['/login']);
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userCredentials');
  }
}
