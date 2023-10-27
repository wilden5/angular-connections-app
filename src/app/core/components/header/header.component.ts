import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { SearchService } from '../../../youtube/services/search.service';
import { projectConstants } from '../../../utils/project-constants';

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
    private snackBar: MatSnackBar
  ) {}

  onToggleFiltersButtonClick(): void {
    if (this.filtersVisibilityService.isSearchUsed) {
      this.filtersVisibilityService.toggleFiltersVisibility();
    } else {
      this.snackBar.open(projectConstants.INACTIVE_FILTERS_WARNING, '', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  onSearchButtonClick(searchQuery: string): void {
    this.filtersVisibilityService.toggleSearchUsed();
    this.router.navigate(['/search']);
    this.searchService.setSearchObservable(searchQuery);
  }
}
