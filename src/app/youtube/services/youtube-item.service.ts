import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
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
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        mergeMap((response) => {
          const itemsWithStats = response.items.map((item) => this.getYoutubeItemStatistics(item));
          return forkJoin(itemsWithStats);
        })
      );
  }

  getSpecificItemById(id: string): Observable<ISearchItem> {
    return this.http
      .get<ISearchResponse>(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=
        ${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        map((statsResponse) => ({ ...statsResponse.items[0], id: { kind: 'youtube#video', videoId: id } }))
      );
  }

  getYoutubeItemStatistics(item: ISearchItem): Observable<ISearchItem> {
    return this.http
      .get<ISearchResponse>(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${item.id.videoId}&key=
        ${httpConstants.YOUTUBE_API_KEY}`
      )
      .pipe(
        tap((response) => console.log(response)),
        map((statsResponse) => ({ ...item, statistics: statsResponse.items[0].statistics }))
      );
  }
}
