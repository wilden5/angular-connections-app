import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectPages } from '../../../../environment/environment';
import { DiscussionService } from '../../services/discussion.service';
import { SnackBarService } from '../../../core/services/snackbar.service';
import { ModalService } from '../../../core/services/modal.service';
import {
  deleteDiscussion,
  deleteDiscussionFailure,
  deleteDiscussionSuccess,
  loadDiscussion,
  loadDiscussionFailure,
  loadDiscussionSuccess,
  sendDiscussionMessage,
  sendDiscussionMessageFailure,
  sendDiscussionMessageSuccess,
} from './discussion.actions';
import { transformDiscussionMessage } from '../../../utils/data-transformer';

@Injectable()
export class DiscussionEffects {
  constructor(
    private actions$: Actions,
    private discussionService: DiscussionService,
    private snackBarService: SnackBarService,
    private modalService: ModalService,
    private router: Router
  ) {}

  loadDiscussion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDiscussion),
      concatMap((action) =>
        this.discussionService.getDiscussion(action.conversationID, action.since).pipe(
          map((conversationResponse) => {
            if (conversationResponse.Count !== 0) {
              const lastMessageTime = Number(
                conversationResponse.Items[conversationResponse.Items.length - 1].createdAt.S
              );
              return loadDiscussionSuccess({
                since: lastMessageTime,
                conversationMessages: transformDiscussionMessage(
                  conversationResponse.Items.sort(
                    (a, b) => Number(a.createdAt.S) - Number(b.createdAt.S)
                  )
                ),
                conversationID: action.conversationID,
              });
            }
            return loadDiscussionSuccess({
              since: action.since,
              conversationMessages: [],
              conversationID: action.conversationID,
            });
          }),
          catchError((error) => {
            return of(loadDiscussionFailure({ error }));
          })
        )
      )
    );
  });

  loadDiscussionSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadDiscussionSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Conversation messages was loaded!');
        })
      );
    },
    { dispatch: false }
  );

  loadDiscussionFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadDiscussionFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  sendDiscussionMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendDiscussionMessage),
      concatMap((action) =>
        this.discussionService
          .sendNewDiscussionMessage(action.conversationMessage)
          .pipe(
            map(() =>
              sendDiscussionMessageSuccess({ conversationMessage: action.conversationMessage })
            )
          )
      ),
      catchError((error) => {
        return of(sendDiscussionMessageFailure({ error }));
      })
    );
  });

  sendDiscussionSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendDiscussionMessageSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('New conversation message was sent!');
        })
      );
    },
    { dispatch: false }
  );

  sendDiscussionFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendDiscussionMessageFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  deleteDiscussion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDiscussion),
      concatMap((action) =>
        this.discussionService.deleteDiscussion(action.id).pipe(
          map(() => deleteDiscussionSuccess({ id: action.id })),
          catchError((error) => {
            return of(deleteDiscussionFailure({ error }));
          })
        )
      )
    );
  });

  deleteDiscussionSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteDiscussionSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Conversation was Deleted successfully!');
          this.router.navigate([ProjectPages.Empty]);
        })
      );
    },
    { dispatch: false }
  );

  deleteDiscussionFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteDiscussionFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
