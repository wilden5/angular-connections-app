import { Component } from '@angular/core';
import { ProjectPages } from '../../../../environment/environment';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly ProjectPages = ProjectPages;

  constructor(protected userService: UserService) {}

  switchTheme(): void {}
}
