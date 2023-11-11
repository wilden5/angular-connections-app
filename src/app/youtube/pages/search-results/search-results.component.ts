import { Component, DestroyRef, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ISearchItem } from '../../models/search-item.model';
import { YoutubeItemService } from '../../services/youtube-item.service';
import { FiltersVisibilityService } from '../../services/filters-visibility.service';
import { SearchService } from '../../services/search.service';
import { projectConstants } from '../../../utils/project-constants';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  itemsArray: ISearchItem[] = [];

  filteredItemsArray: ISearchItem[] = [];

  isSortAscViews = true;

  isSortAscDate = true;

  searchTerm = '';

  constructor(
    private youtubeItemService: YoutubeItemService,
    private snackBarService: SnackBarService,
    protected filtersVisibilityService: FiltersVisibilityService,
    protected searchService: SearchService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.searchService
      .getSearchQueryObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((searchQuery) => searchQuery.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((query) => this.youtubeItemService.getYoutubeItemsBySearchQuery(query))
      )
      .subscribe((data) => {
        this.itemsArray = data;
        this.filteredItemsArray = data;
      });
  }

  sortByViewsCount(): void {
    const sortedArray = this.filteredItemsArray.slice();
    if (this.isSortAscViews) {
      sortedArray.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_VIEWS_ASC);
    } else {
      sortedArray.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_VIEWS_DESC);
    }
    this.isSortAscViews = !this.isSortAscViews;
    this.filteredItemsArray = sortedArray;
  }

  sortByDate(): void {
    const sortedArray = this.filteredItemsArray.slice();
    if (this.isSortAscDate) {
      sortedArray.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime());
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_DATE_ASC);
    } else {
      sortedArray.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime());
      this.snackBarService.setSnackBar(projectConstants.SORT_BY_DATE_DESC);
    }
    this.isSortAscDate = !this.isSortAscDate;
    this.filteredItemsArray = sortedArray;
  }
}
