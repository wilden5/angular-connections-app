import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { IUser } from '../../models/user.model';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { projectConstants } from '../../../utils/project-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private loginService: LoginService,
    private loggerService: LoggerService,
    private fb: FormBuilder
  ) {}

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  getErrorMessageForEmail(): string {
    if (this.email?.hasError('required')) {
      return projectConstants.EMPTY_EMAIL_FIELD_MESSAGE;
    }
    if (this.email?.hasError('email')) {
      return projectConstants.INVALID_EMAIL_FIELD_MESSAGE;
    }
    return '';
  }

  onLoginButtonClick(): void {
    console.warn(this.loginForm.value);
    /* this.loggerService.logMessage(projectConstants.CLICK_ON_LOGIN_BUTTON);
    this.loginService.login(this.user); */
  }
}
