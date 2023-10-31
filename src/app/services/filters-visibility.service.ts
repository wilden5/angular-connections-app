import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersVisibilityService {
  isFiltersVisible = false;

  toggleFiltersVisibility(): void {
    this.isFiltersVisible = !this.isFiltersVisible;
  }
}
