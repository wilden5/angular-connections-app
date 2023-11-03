import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { SearchService } from '../../../youtube/services/search.service';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    protected filtersVisibilityService: FiltersVisibilityService,
    private searchService: SearchService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }

  onSearchButtonClick(searchQuery: string): void {
    this.router.navigate(['/search']);
    this.searchService.setSearchObservable(searchQuery);
  }

  onLogoutButtonClick(): void {
    this.loginService.logout();
  }

  onLoginButtonClick(): void {
    this.router.navigate(['/login']);
  }
}
