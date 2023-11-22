import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { IUser } from '../models/user.model';
import { ProjectPath } from '../../utils/project-constants';

describe('LoginService', () => {
  let service: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user and navigate to main page when credentials are provided', () => {
    const userCredentials: IUser = {
      email: 'test@test.com',
      password: '12345testA!',
    };
    const navigateSpy = jest.spyOn(router, 'navigate');
    service.login(userCredentials);

    expect(localStorage.getItem('userCredentials')).toEqual(JSON.stringify(userCredentials));
    expect(navigateSpy).toHaveBeenCalledWith([ProjectPath.Empty]);
    expect(service.isLoggedIn$).toBeTruthy();
  });

  it('should not login if email is empty', () => {
    const userCredentials: IUser = {
      email: '',
      password: '12345testA!',
    };
    const navigateSpy = jest.spyOn(router, 'navigate');
    service.login(userCredentials);

    expect(localStorage.getItem('userCredentials')).toBeNull();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(service.isLoggedIn$).toBeTruthy();
  });

  it('should not login if password is empty', () => {
    const userCredentials: IUser = {
      email: 'test@test.com',
      password: '',
    };
    const navigateSpy = jest.spyOn(router, 'navigate');
    service.login(userCredentials);

    expect(localStorage.getItem('userCredentials')).toBeNull();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(service.isLoggedIn$).toBeTruthy();
  });
});
