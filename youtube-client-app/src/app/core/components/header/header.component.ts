import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FiltersVisibilityService } from '../../../youtube/services/filters-visibility.service';
import { SearchService } from '../../../youtube/services/search.service';
import { LoginService } from '../../../auth/services/login.service';
import { ProjectPath } from '../../../utils/project-constants';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { searchYoutubeItems } from '../../../redux/actions/youtube-items.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    protected filtersVisibilityService: FiltersVisibilityService,
    private searchService: SearchService,
    private router: Router,
    protected loginService: LoginService,
    private destroyRef: DestroyRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.searchService
      .getSearchQueryObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(1000),
        filter((searchQuery) => searchQuery.length > 2),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.store.dispatch(searchYoutubeItems({ query }));
      });
  }

  onToggleFiltersButtonClick(): void {
    this.filtersVisibilityService.toggleFiltersVisibility();
  }

  onSearchInputChange(searchQuery: string): void {
    this.searchService.setSearchObservable(searchQuery);
    if (searchQuery.length > 2) {
      this.router.navigate([ProjectPath.Search]);
    }
  }

  onLogoutButtonClick(): void {
    this.loginService.logout();
  }

  onLoginButtonClick(): void {
    this.router.navigate([ProjectPath.Login]);
  }

  onAddVideoButtonClick(): void {
    this.router.navigate([`${ProjectPath.Search}/${ProjectPath.Admin}`]);
  }

  onFavoriteButtonClick(): void {
    this.router.navigate([ProjectPath.Favorite]);
  }
}
