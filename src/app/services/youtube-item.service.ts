import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISearchItem } from '../models/search-item.model';
import { youtubeResponse } from '../../mocks/youtube.mock';

@Injectable({
  providedIn: 'root',
})
export class YoutubeItemService {
  // eslint-disable-next-line class-methods-use-this
  getYoutubeItems(): Observable<ISearchItem[]> {
    return of(youtubeResponse.items);
  }
}
