import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISearchItem } from '../../../models/search-item.model';
import { YoutubeItemService } from '../../../services/youtube-item.service';

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
    private snackBar: MatSnackBar
  ) {}

  setSnackBar(customMsg: string): void {
    this.snackBar.open(customMsg, '', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.youtubeItemService.getYoutubeItems().subscribe((data) => {
      this.itemsArray = data;
      this.filteredItemsArray = data;
    });
  }

  sortByViewsCount(): void {
    if (this.isSortAscViews) {
      this.filteredItemsArray.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
      this.setSnackBar('Sorted by views count in ascending order!');
    } else {
      this.filteredItemsArray.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
      this.setSnackBar('Sorted by views count in descending order!');
    }
    this.isSortAscViews = !this.isSortAscViews;
  }

  sortByDate(): void {
    if (this.isSortAscDate) {
      this.filteredItemsArray.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
      );
      this.setSnackBar('Sorted by published date in ascending order!');
    } else {
      this.filteredItemsArray.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
      );
      this.setSnackBar('Sorted by published date in descending order!');
    }
    this.isSortAscDate = !this.isSortAscDate;
  }

  sortByKeyword(searchTerm: string): void {
    const loweredSearchTerm = searchTerm.toLowerCase();

    this.filteredItemsArray = this.itemsArray.filter((item) =>
      item.snippet.title.toLowerCase().includes(loweredSearchTerm)
    );
  }
}
