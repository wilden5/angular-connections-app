import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISearchItem } from '../../../models/search-item.model';
import { YoutubeItemService } from '../../../services/youtube-item.service';
import { SortByKeywordPipe } from '../../../pipes/sort-by-keyword.pipe';
import { FiltersVisibilityService } from '../../../services/filters-visibility.service';
import { SearchService } from '../../../services/search.service';
import { projectConstants } from '../../../utils/project-constants';

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

  performSearchQuery(): void {
    if (this.searchService.getSearchQuery()) {
      this.youtubeItemService
        .getYoutubeItemsBySearchQuery(this.searchService.getSearchQuery() as string)
        .subscribe((data) => {
          this.itemsArray = data;
          this.filteredItemsArray = data;
        });
    } else {
      this.youtubeItemService.getYoutubeItems().subscribe((data) => {
        this.itemsArray = data;
        this.filteredItemsArray = data;
      });
    }
  }

  ngOnInit(): void {
    this.performSearchQuery();
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
