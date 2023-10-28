import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  login(credentials: IUser): void {
    if (credentials.email && credentials.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
