import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchItem } from '../models/search-item.model';
import { ISearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeItemService {
  constructor(private http: HttpClient) {}

  getYoutubeItemsBySearchQuery(query: string): Observable<ISearchItem[]> {
    return this.http.get<ISearchResponse>(`search?part=snippet&q=${query}&maxResults=12&`).pipe(
      concatMap((response) => {
        const videoIds = response.items.map((item) => item.id.videoId).join(',');
        return this.getYoutubeItemsByIds(videoIds);
      }),
      map((itemsWithStats) => itemsWithStats.filter((item) => Object.keys(item.statistics).length > 0)),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getYoutubeItemsByIds(ids: string): Observable<ISearchItem[]> {
    return this.http.get<ISearchResponse>(`videos?part=snippet,statistics&id=${ids}`).pipe(
      map((itemResponse) => itemResponse.items),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getYoutubeSpecificItemById(id: string): Observable<ISearchItem> {
    // temporary before NgRx implementation, since currently we are storing items inside the search-results component
    return this.http.get<ISearchResponse>(`videos?part=snippet,statistics&id=${id}`).pipe(
      map((itemResponse) => ({ ...itemResponse.items[0] })),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
