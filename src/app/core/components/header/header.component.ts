import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private searchService: SearchService,
    private router: Router
  ) {}

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }

  onSearchButtonClick(searchQuery: string): void {
    this.router.navigate(['/search']);
    this.searchService.setSearchObservable(searchQuery);
  }
}
