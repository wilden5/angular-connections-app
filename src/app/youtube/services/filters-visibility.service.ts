import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    return this.router.url.includes('/item/') || this.router.url === '/' || this.router.url.includes('/login');
  }
}
