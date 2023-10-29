import { Component } from '@angular/core';
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

  user: IUser = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private loggerService: LoggerService
  ) {}

  onLoginButtonClick(): void {
    this.loggerService.logMessage(projectConstants.CLICK_ON_LOGIN_BUTTON);
    this.loginService.login(this.user);
  }
}
