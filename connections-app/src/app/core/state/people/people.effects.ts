import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { SnackBarService } from '../../services/snackbar.service';
import {
  loadPeopleList,
  loadPeopleListDirectHttp,
  loadPeopleListHttpFailure,
  loadPeopleListHttpSuccess,
  loadPeopleListStore,
} from './people.actions';
import { selectPeopleList } from './people.selectors';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private peopleService: PeopleService,
    private snackBarService: SnackBarService
  ) {}

  loadPeopleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPeopleList),
      concatLatestFrom(() => this.store.select(selectPeopleList)),
      switchMap(([actions, persons]) => {
        if (persons.length > 0) {
          return of(loadPeopleListStore());
        }
        return this.peopleService.getPeopleList().pipe(
          map((peopleList) =>
            loadPeopleListHttpSuccess({
              peopleList: this.peopleService.transformPersonInformation(peopleList.Items),
            })
          ),
          catchError((error) => {
            return of(loadPeopleListHttpFailure({ error }));
          })
        );
      })
    );
  });

  loadPeopleListSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPeopleListHttpSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('People list was received!');
        })
      );
    },
    { dispatch: false }
  );

  loadPeopleListFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPeopleListHttpFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  loadPeopleListDirectHttp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPeopleListDirectHttp),
      switchMap(() =>
        this.peopleService.getPeopleList().pipe(
          map((peopleList) =>
            loadPeopleListHttpSuccess({
              peopleList: this.peopleService.transformPersonInformation(peopleList.Items),
            })
          ),
          catchError((error) => {
            return of(loadPeopleListHttpFailure({ error }));
          })
        )
      )
    );
  });
}
