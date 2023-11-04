import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
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

  searchQuerySubject = new Subject<string>();

  constructor(
    protected filtersVisibilityService: FiltersVisibilityService,
    private searchService: SearchService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.searchQuerySubject.pipe(debounceTime(1000)).subscribe((searchQuery) => {
      this.router.navigate(['/search']);
      this.searchService.setSearchObservable(searchQuery);
    });

    this.loginService.isLoggedIn$.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }

  onSearchInputChange(searchQuery: string): void {
    if (searchQuery && searchQuery.length > 2) {
      this.searchQuerySubject.next(searchQuery);
    }
  }

  onLogoutButtonClick(): void {
    this.loginService.logout();
  }

  onLoginButtonClick(): void {
    this.router.navigate(['/login']);
  }
}
