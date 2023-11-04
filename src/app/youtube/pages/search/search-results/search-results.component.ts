import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISearchItem } from '../../../models/search-item.model';
import { YoutubeItemService } from '../../../services/youtube-item.service';
import { FiltersVisibilityService } from '../../../services/filters-visibility.service';
import { SearchService } from '../../../services/search.service';
import { projectConstants } from '../../../../utils/project-constants';
import { SnackBarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  itemsArray: ISearchItem[] = [];

  filteredItemsArray: ISearchItem[] = [];

  isSortAscViews = true;

  isSortAscDate = true;

  searchTerm = '';

  private searchQuerySubscription?: Subscription;

  constructor(
    private youtubeItemService: YoutubeItemService,
    private snackBarService: SnackBarService,
    protected filtersVisibilityService: FiltersVisibilityService,
    protected searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchQuerySubscription = this.searchService.getSearchQueryObservable().subscribe((query) => {
      this.youtubeItemService.getYoutubeItemsBySearchQuery(query).subscribe((data) => {
        this.itemsArray = data;
        this.filteredItemsArray = data;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
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
