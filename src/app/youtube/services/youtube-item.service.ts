import { Injectable } from '@angular/core';
import { catchError, concatMap, forkJoin, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchItem } from '../models/search-item.model';
import { httpConstants } from '../../utils/project-constants';
import { ISearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeItemService {
  constructor(private http: HttpClient) {}

  getYoutubeItemsBySearchQuery(query: string): Observable<ISearchItem[]> {
    return this.http
      .get<ISearchResponse>(
        `${httpConstants.YOUTUBE_BASE_URL}/search?part=snippet&q=${query}&maxResults=5&key=
        ${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        concatMap((response) => {
          const itemsWithStats = response.items.map((item) => this.getYoutubeItemStatistics(item));
          return forkJoin(itemsWithStats);
        }),
        map((itemsWithStats) => itemsWithStats.filter((item) => Object.keys(item.statistics).length > 0)),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getSpecificItemById(id: string): Observable<ISearchItem> {
    return this.http
      .get<ISearchResponse>(
        `${httpConstants.YOUTUBE_BASE_URL}/videos?part=snippet,statistics&id=${id}&key=
        ${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        map((itemResponse) => ({ ...itemResponse.items[0], id: { kind: 'youtube#video', videoId: id } })),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getYoutubeItemStatistics(item: ISearchItem): Observable<ISearchItem> {
    return this.http
      .get<ISearchResponse>(
        `${httpConstants.YOUTUBE_BASE_URL}/videos?part=snippet,statistics&id=${item.id.videoId}&key=
        ${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        map((statsResponse) => {
          const statistics = statsResponse.items[0]?.statistics;
          return { ...item, statistics: statistics || {} };
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
