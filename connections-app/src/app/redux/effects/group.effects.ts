import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { SnackBarService } from '../../core/services/snackbar.service';
import {
  createGroup,
  createGroupFailure,
  createGroupSuccess,
  deleteGroup,
  deleteGroupFailure,
  deleteGroupSuccess,
  loadGroupList,
  loadGroupListDirectHttp,
  loadGroupListHttpFailure,
  loadGroupListHttpSuccess,
  loadGroupListStore,
} from '../actions/group.actions';
import { GroupService } from '../../core/services/group.service';
import { loadProfileHttpFailure } from '../actions/user.actions';
import { selectGroupList } from '../selectors/group.selectors';
import { ModalService } from '../../core/services/modal.service';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private groupService: GroupService,
    private snackBarService: SnackBarService,
    private modalService: ModalService
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
        ofType(loadGroupListHttpSuccess),
        tap(() => {
          this.groupService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar('Group list was received!');
        })
      );
    },
    { dispatch: false }
  );

  loadGroupListFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadGroupListHttpFailure),
        tap((action) => {
          this.groupService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  loadGroupListDirectHttp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroupListDirectHttp),
      switchMap(() =>
        this.groupService.getGroupList().pipe(
          map((groupListHttp) =>
            loadGroupListHttpSuccess({
              groupList: this.groupService.transformProfileInformation(groupListHttp.Items),
            })
          ),
          catchError((error) => {
            return of(loadProfileHttpFailure({ error }));
          })
        )
      )
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGroup),
      concatMap((action) =>
        this.groupService.deleteGroup(action.id).pipe(
          map(() => deleteGroupSuccess({ id: action.id })),
          catchError((error) => {
            return of(deleteGroupFailure({ error }));
          })
        )
      )
    );
  });

  deleteGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteGroupSuccess),
        tap(() => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar('Group was Deleted successfully!');
        })
      );
    },
    { dispatch: false }
  );

  deleteGroupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteGroupFailure),
        tap((action) => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGroup),
      concatMap((action) =>
        this.groupService.createNewGroup(action.name).pipe(
          map((response) => createGroupSuccess({ name: action.name, response })),
          catchError((error) => {
            return of(createGroupFailure({ error }));
          })
        )
      )
    );
  });

  createGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createGroupSuccess),
        tap(() => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar('Group was Created successfully!');
          // todo: move plain text to constants object
        })
      );
    },
    { dispatch: false }
  );

  createGroupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createGroupFailure),
        tap((action) => {
          this.modalService.isExceptionSubject.next(false);
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
