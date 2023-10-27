import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { SearchService } from '../../../youtube/services/search.service';
import { projectConstants } from '../../../utils/project-constants';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private filtersVisibilityService: FiltersVisibilityService,
    private searchService: SearchService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  onToggleFiltersButtonClick(): void {
    if (this.filtersVisibilityService.isSearchUsed) {
      this.filtersVisibilityService.toggleFiltersVisibility();
    } else {
      this.snackBarService.setSnackBar(projectConstants.INACTIVE_FILTERS_WARNING);
    }
  }

  onSearchButtonClick(searchQuery: string): void {
    this.filtersVisibilityService.toggleSearchUsed();
    this.router.navigate(['/search']);
    this.searchService.setSearchObservable(searchQuery);
  }
}
