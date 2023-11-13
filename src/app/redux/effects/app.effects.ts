import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { YoutubeItemService } from '../../youtube/services/youtube-item.service';
import { loadYoutubeItems, searchYoutubeItems } from '../actions/youtube-items.actions';

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

  constructor(
    private actions$: Actions,
    private youtubeItemService: YoutubeItemService
  ) {}
}
