import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ConversationService } from '../../core/services/conversation.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  createNewConversation,
  createNewConversationFailure,
  createNewConversationSuccess,
  loadConversationList,
  loadConversationListFailure,
  loadConversationListSuccess,
} from '../actions/conversation.actions';
import { ProjectPages } from '../../../environment/environment';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private conversationService: ConversationService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  loadConversationList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConversationList),
      concatMap(() =>
        this.conversationService.getConversationList().pipe(
          map((conversationList) =>
            loadConversationListSuccess({
              conversationList: this.conversationService.transformConversationInformation(
                conversationList.Items
              ),
            })
          ),
          catchError((error) => {
            return of(loadConversationListFailure({ error }));
          })
        )
      )
    );
  });

  loadConversationListSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadConversationListSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Conversation list was loaded!');
        })
      );
    },
    { dispatch: false }
  );

  loadConversationListFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadConversationListFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

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
        tap((action) => {
          this.router.navigate([ProjectPages.Conversation, action.conversationId.conversationID]);
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
