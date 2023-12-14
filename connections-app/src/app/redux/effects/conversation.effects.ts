import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ConversationService } from '../../core/services/conversation.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  createNewConversation,
  createNewConversationFailure,
  createNewConversationSuccess,
  deleteConversation,
  deleteConversationFailure,
  deleteConversationSuccess,
  loadConversationList,
  loadConversationListFailure,
  loadConversationListStore,
  loadConversationListSuccess,
  loadSpecificConversation,
  loadSpecificConversationFailure,
  loadSpecificConversationSuccess,
  sendConversationMessage,
  sendConversationMessageFailure,
  sendConversationMessageSuccess,
} from '../actions/conversation.actions';
import { ProjectPages } from '../../../environment/environment';
import { selectConversationList } from '../selectors/conversation.selectors';
import { IConversationItemTransformed } from '../../core/models/conversation.model';
import { ModalService } from '../../core/services/modal.service';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private conversationService: ConversationService,
    private snackBarService: SnackBarService,
    private router: Router,
    private modalService: ModalService
  ) {}

  loadConversationList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConversationList),
      concatLatestFrom(() => this.store.select(selectConversationList)),
      switchMap(([actions, conversationList]) => {
        if (conversationList.length > 0) {
          return of(loadConversationListStore());
        }
        return this.conversationService.getConversationList().pipe(
          map((conversationListHttp) =>
            loadConversationListSuccess({
              conversationList: this.conversationService.transformConversationInformation(
                conversationListHttp.Items
              ),
            })
          ),
          catchError((error) => {
            return of(loadConversationListFailure({ error }));
          })
        );
      })
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
          map((conversationId) => {
            const newConversation: IConversationItemTransformed = {
              id: conversationId.conversationID,
              companionID: action.companionId,
            };
            return createNewConversationSuccess({ conversation: newConversation });
          }),
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
          this.router.navigate([ProjectPages.Conversation, action.conversation.id]);
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

  loadSpecificConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSpecificConversation),
      concatMap((action) =>
        this.conversationService.getSpecificConversation(action.conversationID, action.since).pipe(
          map((conversationResponse) => {
            if (conversationResponse.Count !== 0) {
              const lastMessageTime = Number(
                conversationResponse.Items[conversationResponse.Items.length - 1].createdAt.S
              );
              return loadSpecificConversationSuccess({
                since: lastMessageTime,
                conversationMessages: this.conversationService.transformConversationMessage(
                  conversationResponse.Items.sort(
                    (a, b) => Number(a.createdAt.S) - Number(b.createdAt.S)
                  )
                ),
                conversationID: action.conversationID,
              });
            }
            return loadSpecificConversationSuccess({
              since: action.since,
              conversationMessages: [],
              conversationID: action.conversationID,
            });
          }),
          catchError((error) => {
            return of(loadSpecificConversationFailure({ error }));
          })
        )
      )
    );
  });

  loadSpecificConversationSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSpecificConversationSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Conversation messages was loaded!');
          this.conversationService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  loadSpecificConversationFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSpecificConversationFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
          this.conversationService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  sendConversationMessageMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendConversationMessage),
      concatMap((action) =>
        this.conversationService
          .sendNewMessageToConversation(action.conversationMessage)
          .pipe(
            map(() =>
              sendConversationMessageSuccess({ conversationMessage: action.conversationMessage })
            )
          )
      ),
      catchError((error) => {
        return of(sendConversationMessageFailure({ error }));
      })
    );
  });

  sendConversationMessageSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendConversationMessageSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('New conversation message was sent!');
          this.conversationService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  sendConversationMessageFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendConversationMessageFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
          this.conversationService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  deleteConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteConversation),
      concatMap((action) =>
        this.conversationService.deleteConversation(action.id).pipe(
          map(() => deleteConversationSuccess({ id: action.id })),
          catchError((error) => {
            return of(deleteConversationFailure({ error }));
          })
        )
      )
    );
  });

  deleteConversationSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteConversationSuccess),
        tap(() => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar('Conversation was Deleted successfully!');
          this.router.navigate([ProjectPages.Empty]);
        })
      );
    },
    { dispatch: false }
  );

  deleteConversationFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteConversationFailure),
        tap((action) => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
