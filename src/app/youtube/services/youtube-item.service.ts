import { Injectable } from '@angular/core';
import { catchError, concatMap, forkJoin, map, Observable, throwError } from 'rxjs';
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
    return this.http.get<ISearchResponse>(`videos?part=snippet,statistics&id=${id}`).pipe(
      map((itemResponse) => ({ ...itemResponse.items[0] })),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getYoutubeItemStatistics(item: ISearchItem): Observable<ISearchItem> {
    return this.http.get<ISearchResponse>(`videos?part=snippet,statistics&id=${item.id.videoId}`).pipe(
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
