import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPath } from '../../utils/project-constants';

@Injectable({
  providedIn: 'root',
})
export class FiltersVisibilityService {
  isFiltersVisible = false;

  constructor(private router: Router) {}

  toggleFiltersVisibility(): void {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  isItemOrMainRoute(): boolean {
    return (
      this.router.url.includes(`${ProjectPath.Item}/`) ||
      this.router.url === '/' ||
      this.router.url.includes(ProjectPath.Login) ||
      this.router.url.includes(ProjectPath.Favorite)
    );
  }
}
