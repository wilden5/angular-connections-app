import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { ConversationService } from '../../core/services/conversation.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  createNewConversation,
  createNewConversationFailure,
  createNewConversationSuccess,
} from '../actions/conversation.actions';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private conversationService: ConversationService,
    private snackBarService: SnackBarService
  ) {}

  createNewConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNewConversation),
      concatMap((action) =>
        this.conversationService.createConversation(action.companionId).pipe(
          map((conversationId) => createNewConversationSuccess({ conversationId })),
          catchError((error) => {
            return of(createNewConversationFailure({ error }));
          })
        )
      )
    );
  });

  createNewConversationSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createNewConversationSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('New Conversation was created!');
        })
      );
    },
    { dispatch: false }
  );

  createNewConversationFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createNewConversationFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
