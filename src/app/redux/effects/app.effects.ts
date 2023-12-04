import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap, take } from 'rxjs';
import { YoutubeItemService } from '../../youtube/services/youtube-item.service';
import {
  loadNextYoutubeItemsPage,
  loadPrevYoutubeItemsPage,
  loadYoutubeItems,
  searchYoutubeItems,
} from '../actions/youtube-items.actions';
import { SearchService } from '../../youtube/services/search.service';

@Injectable()
export class AppEffects {
  searchYoutubeItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchYoutubeItems),
      mergeMap((action) =>
        this.youtubeItemService.getYoutubeItemsBySearchQuery(action.query).pipe(
          map((youtubeItems) => loadYoutubeItems({ youtubeItems })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadNextYoutubeItemsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNextYoutubeItemsPage),
      switchMap(() =>
        this.searchService.getSearchQueryObservable().pipe(
          take(1),
          switchMap((searchTerm) => {
            return this.youtubeItemService.getYoutubeItemsBySearchQuery(searchTerm);
          }),
          map((youtubeItems) => loadYoutubeItems({ youtubeItems })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadPrevYoutubeItemsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPrevYoutubeItemsPage),
      switchMap(() =>
        this.searchService.getSearchQueryObservable().pipe(
          take(1),
          switchMap((searchTerm) => {
            return this.youtubeItemService.getYoutubeItemsBySearchQuery(searchTerm, false);
          }),
          map((youtubeItems) => loadYoutubeItems({ youtubeItems })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private youtubeItemService: YoutubeItemService,
    private searchService: SearchService
  ) {}
}
