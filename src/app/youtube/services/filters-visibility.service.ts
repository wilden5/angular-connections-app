import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersVisibilityService {
  isFiltersVisible = false;

  isSearchUsed = false;

  toggleFiltersVisibility(): void {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

  toggleSearchUsed(): void {
    this.isSearchUsed = !this.isSearchUsed;
  }
}
