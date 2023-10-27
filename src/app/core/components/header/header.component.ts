import { Component } from '@angular/core';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { SearchService } from '../../../youtube/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private filtersVisibilityService: FiltersVisibilityService,
    private searchService: SearchService
  ) {}

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }

  onSearchButtonClick(searchQuery: string): void {
    this.searchService.setSearchObservable(searchQuery);
  }
}
