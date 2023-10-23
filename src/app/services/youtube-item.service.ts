import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchItem } from '../models/search-item.model';
import { youtubeResponse } from '../../mocks/youtube.mock';

@Injectable({
  providedIn: 'root',
})
export class YoutubeItemService {
  getYoutubeItems(): Observable<ISearchItem[]> {
    return of(youtubeResponse.items);
  }

  getYoutubeItemsBySearchQuery(query: string): Observable<ISearchItem[]> {
    return of(youtubeResponse.items.filter((item) => item.snippet.title.toLowerCase().includes(query.toLowerCase())));
  }
}
