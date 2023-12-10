import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  loadGroupDialog,
  loadGroupDialogHttpFailure,
  loadGroupDialogHttpSuccess,
} from '../actions/dialog.actions';
import { DialogService } from '../../group/services/dialog.service';

@Injectable()
export class DialogEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
  ) {}

  loadGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroupDialog),
      concatMap((action) =>
        this.dialogService.getGroupDialog(action.groupID, action.since).pipe(
          map((groupDialog) => {
            if (groupDialog.Items.length > 0) {
              const lastMessageTime = Number(
                groupDialog.Items[groupDialog.Items.length - 1].createdAt.S
              );
              return loadGroupDialogHttpSuccess({
                since: lastMessageTime,
                groupMessages: this.dialogService.transformGroupMessage(
                  groupDialog.Items.sort((a, b) => Number(a.createdAt.S) - Number(b.createdAt.S))
                ),
                groupID: action.groupID,
              });
            }
            return loadGroupDialogHttpSuccess({
              since: 0,
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
          this.snackBarService.setSnackBar('Group messages was loaded!');
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
}
