import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
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
} from './group.actions';
import { GroupService } from '../services/group.service';
import { loadProfileHttpFailure } from '../../auth/state/user.actions';
import { selectGroupList } from './group.selectors';
import { ModalService } from '../../core/services/modal.service';
import { projectConstants, ProjectPages } from '../../../environment/environment';
import { transformGroupInformation } from '../../utils/data-transformer';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private groupService: GroupService,
    private snackBarService: SnackBarService,
    private modalService: ModalService,
    private router: Router
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
              groupList: transformGroupInformation(groupListHttp.Items),
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
          this.snackBarService.setSnackBar(projectConstants.groupListLoadSuccess);
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
              groupList: transformGroupInformation(groupListHttp.Items),
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
          this.snackBarService.setSnackBar(projectConstants.groupDeletedSuccess);
          this.router.navigate([ProjectPages.Empty]);
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
          this.snackBarService.setSnackBar(projectConstants.groupCreatedSuccess);
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
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
