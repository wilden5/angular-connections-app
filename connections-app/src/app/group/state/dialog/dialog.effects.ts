import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { SnackBarService } from '../../../core/services/snackbar.service';
import {
  loadGroupDialog,
  loadGroupDialogHttpFailure,
  loadGroupDialogHttpSuccess,
  sendNewMessage,
  sendNewMessageFailure,
  sendNewMessageSuccess,
} from './dialog.actions';
import { DialogService } from '../../services/dialog.service';
import { projectConstants } from '../../../../environment/environment';
import { transformGroupMessage } from '../../../utils/data-transformer';

@Injectable()
export class DialogEffects {
  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
  ) {}

  loadGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroupDialog),
      concatMap((action) =>
        this.dialogService.getGroupDialog(action.groupID, action.since).pipe(
          map((groupDialog) => {
            if (groupDialog.Count !== 0) {
              const lastMessageTime = Number(
                groupDialog.Items[groupDialog.Items.length - 1].createdAt.S
              );
              return loadGroupDialogHttpSuccess({
                since: lastMessageTime,
                groupMessages: transformGroupMessage(
                  groupDialog.Items.sort((a, b) => Number(a.createdAt.S) - Number(b.createdAt.S))
                ),
                groupID: action.groupID,
              });
            }
            return loadGroupDialogHttpSuccess({
              since: action.since,
              groupMessages: [],
              groupID: action.groupID,
            });
          }),
          catchError((error) => {
            return of(loadGroupDialogHttpFailure({ error }));
          })
        )
      )
    );
  });

  loadGroupDialogSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadGroupDialogHttpSuccess),
        tap(() => {
          this.snackBarService.setSnackBar(projectConstants.dialogLoadSuccess);
        })
      );
    },
    { dispatch: false }
  );

  loadGroupDialogFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadGroupDialogHttpFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  sendNewMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendNewMessage),
      concatMap((action) =>
        this.dialogService
          .sendNewMessageToDialog(action.newMessage)
          .pipe(map(() => sendNewMessageSuccess({ newMessage: action.newMessage })))
      ),
      catchError((error) => {
        return of(sendNewMessageFailure({ error }));
      })
    );
  });

  sendNewMessageSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendNewMessageSuccess),
        tap(() => {
          this.snackBarService.setSnackBar(projectConstants.dialogNewMessageSuccess);
        })
      );
    },
    { dispatch: false }
  );

  sendNewMessageFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendNewMessageFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
