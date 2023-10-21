import { Component } from '@angular/core';
import { youtubeResponse } from '../../../mocks/youtube.mock';
import { ISearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  mockArray: ISearchItem[] = youtubeResponse.items;
}
