import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProjectPages } from '../../../../environment/environment';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly ProjectPages = ProjectPages;

  private theme = localStorage.getItem('theme') || 'light-theme';

  private backgroundColor = localStorage.getItem('backgroundColor') || 'white';

  constructor(
    protected userService: UserService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer.addClass(this.document.body, this.theme);
    this.renderer.setStyle(this.document.body, 'background-color', this.backgroundColor);
  }

  switchTheme(): void {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.backgroundColor = this.theme === 'dark-theme' ? 'black' : 'white';
    localStorage.setItem('theme', this.theme);
    localStorage.setItem('backgroundColor', this.backgroundColor);

    const oldTheme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(this.document.body, oldTheme);

    this.renderer.addClass(this.document.body, this.theme);
    this.renderer.setStyle(this.document.body, 'background-color', this.backgroundColor);
  }
}
