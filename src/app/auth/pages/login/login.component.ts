import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { IUser } from '../../models/user.model';

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

  constructor(private loginService: LoginService) {}

  onLoginButtonClick(): void {
    this.loginService.login(this.user);
  }
}
