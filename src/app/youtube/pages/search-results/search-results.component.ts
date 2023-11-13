import { Component, DestroyRef, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ISearchItem } from '../../models/search-item.model';
import { FiltersVisibilityService } from '../../services/filters-visibility.service';
import { SearchService } from '../../services/search.service';
import { projectConstants } from '../../../utils/project-constants';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { searchYoutubeItems, sortYoutubeItems } from '../../../redux/actions/youtube-items.actions';
import {
  selectYoutubeItems,
  selectYoutubeItemsSortedByDateAsc,
  selectYoutubeItemsSortedByDateDesc,
  selectYoutubeItemsSortedByViewsASC,
  selectYoutubeItemsSortedByViewsDESC,
} from '../../../redux/selectors/youtube-items.selectors';
import { AppState } from '../../../redux/app.state';
import { selectAllItems } from '../../../redux/selectors/items.selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  protected readonly selectYoutubeItems = selectYoutubeItems;

  protected readonly selectAllItems = selectAllItems;

  isSortAscViews = true;

  isSortAscDate = true;

  searchTerm = '';

  sortedStore$: Observable<ISearchItem[]> | undefined;

  constructor(
    private snackBarService: SnackBarService,
    protected filtersVisibilityService: FiltersVisibilityService,
    protected searchService: SearchService,
    private destroyRef: DestroyRef,
    protected store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.searchService
      .getSearchQueryObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((searchQuery) => searchQuery.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.store.dispatch(searchYoutubeItems({ query }));
      });
  }

  sortByViewsCount(): void {
    if (this.isSortAscViews) {
      this.sortedStore$ = this.store.select(selectYoutubeItemsSortedByViewsASC);
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_VIEWS_ASC);
    } else {
      this.sortedStore$ = this.store.select(selectYoutubeItemsSortedByViewsDESC);
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_VIEWS_DESC);
    }
    this.isSortAscViews = !this.isSortAscViews;

    this.sortedStore$.pipe(take(1)).subscribe((sortedStore) => {
      this.store.dispatch(sortYoutubeItems({ youtubeItems: sortedStore }));
    });
  }

  sortByDate(): void {
    if (this.isSortAscDate) {
      this.sortedStore$ = this.store.select(selectYoutubeItemsSortedByDateAsc);
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_DATE_ASC);
    } else {
      this.sortedStore$ = this.store.select(selectYoutubeItemsSortedByDateDesc);
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_DATE_DESC);
    }
    this.isSortAscDate = !this.isSortAscDate;

    this.sortedStore$.pipe(take(1)).subscribe((sortedStore) => {
      this.store.dispatch(sortYoutubeItems({ youtubeItems: sortedStore }));
    });
  }
}
