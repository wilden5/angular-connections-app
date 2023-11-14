import { Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchItem } from '../models/search-item.model';
import { ISearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeItemService {
  private nextPageToken = '';

  public prevPageToken = '';

  constructor(private http: HttpClient) {}

  getYoutubeItemsBySearchQuery(query: string, isNextPage = true): Observable<ISearchItem[]> {
    const pageToken = isNextPage ? this.nextPageToken : this.prevPageToken;
    return this.http.get<ISearchResponse>(`search?part=snippet&q=${query}&maxResults=20&pageToken=${pageToken}`).pipe(
      tap((response) => {
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken ? response.prevPageToken : '';
      }),
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
}
