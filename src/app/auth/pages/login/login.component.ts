import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { IUser } from '../../models/user.model';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { projectConstants } from '../../../utils/project-constants';
import { customPasswordValidator } from '../../validators/login.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, customPasswordValidator]],
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

  getErrorMessageForPassword(): string {
    if (this.password?.hasError('required')) {
      return projectConstants.EMPTY_PASSWORD_FIELD_MESSAGE;
    }

    if (this.password?.hasError('hasLength')) {
      return projectConstants.PASSWORD_LENGTH_MESSAGE;
    }

    if (this.password?.hasError('hasLowerCaseLetter') || this.password?.hasError('hasUpperCaseLetter')) {
      return projectConstants.PASSWORD_UPPER_LOWER_CASE_MESSAGE;
    }

    if (this.password?.hasError('hasDigit') || this.password?.hasError('hasAnyLetter')) {
      return projectConstants.PASSWORD_DIGITS_LETTERS_MESSAGE;
    }

    if (this.password?.hasError('hasSpecialCharacter')) {
      return projectConstants.PASSWORD_SPECIAL_SYMBOLS_MESSAGE;
    }

    return '';
  }

  onLoginButtonClick(): void {
    this.loggerService.logMessage(projectConstants.CLICK_ON_LOGIN_BUTTON);
    this.loginService.login(this.loginForm.value as IUser);
  }
}
