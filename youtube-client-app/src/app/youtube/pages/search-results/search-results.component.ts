import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ISearchItem } from '../../models/search-item.model';
import { FiltersVisibilityService } from '../../services/filters-visibility.service';
import { projectConstants } from '../../../utils/project-constants';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import {
  loadNextYoutubeItemsPage,
  loadPrevYoutubeItemsPage,
  sortYoutubeItems,
} from '../../../redux/actions/youtube-items.actions';
import {
  selectYoutubeItemsSortedByDateAsc,
  selectYoutubeItemsSortedByDateDesc,
  selectYoutubeItemsSortedByViewsASC,
  selectYoutubeItemsSortedByViewsDESC,
} from '../../../redux/selectors/youtube-items.selectors';
import { AppState } from '../../../redux/app.state';
import { selectAllItems } from '../../../redux/selectors/items.selectors';
import { YoutubeItemService } from '../../services/youtube-item.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  protected readonly selectAllItems = selectAllItems;

  isSortAscViews = true;

  isSortAscDate = true;

  searchTerm = '';

  sortedStore$: Observable<ISearchItem[]> | undefined;

  constructor(
    private snackBarService: SnackBarService,
    protected filtersVisibilityService: FiltersVisibilityService,
    protected store: Store<AppState>,
    protected youtubeItemService: YoutubeItemService
  ) {}

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

  onNextPageButtonClick(): void {
    this.store.dispatch(loadNextYoutubeItemsPage());
  }

  onPrevButtonClick(): void {
    this.store.dispatch(loadPrevYoutubeItemsPage());
  }
}
