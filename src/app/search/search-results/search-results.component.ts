import { Component, OnInit } from '@angular/core';
import { ISearchItem } from '../../models/search-item.model';
import { YoutubeItemService } from '../../services/youtube-item.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  itemsArray: ISearchItem[] = [];

  filteredItemsArray: ISearchItem[] = [];

  constructor(private youtubeItemService: YoutubeItemService) {}

  ngOnInit(): void {
    this.youtubeItemService.getYoutubeItems().subscribe((data) => {
      this.itemsArray = data;
      this.filteredItemsArray = data;
    });
  }
}
