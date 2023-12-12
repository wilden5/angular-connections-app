import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPages } from '../../../../environment/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  protected readonly ProjectPages = ProjectPages;

  protected pageUrl: string;

  constructor(private router: Router) {
    this.pageUrl = this.router.url;
  }
}
