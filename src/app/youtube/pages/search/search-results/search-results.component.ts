import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ISearchItem } from '../../../models/search-item.model';
import { YoutubeItemService } from '../../../services/youtube-item.service';
import { SortByKeywordPipe } from '../../../pipes/sort-by-keyword.pipe';
import { FiltersVisibilityService } from '../../../services/filters-visibility.service';
import { SearchService } from '../../../services/search.service';
import { projectConstants } from '../../../../utils/project-constants';

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

  private searchQuerySubscription?: Subscription;

  constructor(
    private youtubeItemService: YoutubeItemService,
    private snackBar: MatSnackBar,
    private sortByKeywordPipe: SortByKeywordPipe,
    protected filtersVisibilityService: FiltersVisibilityService,
    protected searchService: SearchService
  ) {}

  setSnackBar(customMsg: string): void {
    this.snackBar.open(customMsg, '', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.searchQuerySubscription = this.searchService.getSearchQueryObservable().subscribe((query) => {
      if (query) {
        this.youtubeItemService.getYoutubeItemsBySearchQuery(query).subscribe((data) => {
          this.itemsArray = data;
          this.filteredItemsArray = data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }

  sortByViewsCount(): void {
    if (this.isSortAscViews) {
      this.filteredItemsArray.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
      this.setSnackBar(projectConstants.SORT_BY_VIEWS_ASC);
    } else {
      this.filteredItemsArray.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
      this.setSnackBar(projectConstants.SORT_BY_VIEWS_DESC);
    }
    this.isSortAscViews = !this.isSortAscViews;
  }

  sortByDate(): void {
    if (this.isSortAscDate) {
      this.filteredItemsArray.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
      );
      this.setSnackBar(projectConstants.SORT_BY_DATE_ASC);
    } else {
      this.filteredItemsArray.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
      );
      this.setSnackBar(projectConstants.SORT_BY_DATE_DESC);
    }
    this.isSortAscDate = !this.isSortAscDate;
  }

  sortByKeyword(searchTerm: string): void {
    this.filteredItemsArray = this.sortByKeywordPipe.transform(this.itemsArray, searchTerm);
  }
}
