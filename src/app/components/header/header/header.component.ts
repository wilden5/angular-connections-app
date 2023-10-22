import { Component } from '@angular/core';
import { FiltersVisibilityService } from '../../../services/filters-visibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private filtersVisibilityService: FiltersVisibilityService) {}

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }
}
