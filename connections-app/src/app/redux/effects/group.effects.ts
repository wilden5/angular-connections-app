import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  loadGroupList,
  loadGroupListHttpSuccess,
  loadGroupListStore,
} from '../actions/group.actions';
import { GroupService } from '../../core/services/group.service';
import { loadProfileHttpFailure, loadProfileHttpSuccess } from '../actions/user.actions';
import { selectGroupList } from '../selectors/group.selectors';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private groupService: GroupService,
    private snackBarService: SnackBarService
  ) {}

  loadGroupList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroupList),
      concatLatestFrom(() => this.store.select(selectGroupList)),
      switchMap(([actions, groupList]) => {
        if (groupList.length > 0) {
          return of(loadGroupListStore());
        }
        return this.groupService.getGroupList().pipe(
          map((groupListHttp) =>
            loadGroupListHttpSuccess({
              groupList: this.groupService.transformProfileInformation(groupListHttp.Items),
            })
          ),
          catchError((error) => {
            return of(loadProfileHttpFailure({ error }));
          })
        );
      })
    );
  });

  loadGroupListSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadProfileHttpSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Group list was received!');
        })
      );
    },
    { dispatch: false }
  );

  loadGroupListFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadProfileHttpFailure),
        tap((action) => this.snackBarService.setSnackBar(action.error.error.message))
      );
    },
    { dispatch: false }
  );
}
