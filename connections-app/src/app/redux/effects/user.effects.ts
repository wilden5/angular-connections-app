import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  loginFailure,
  loginSuccess,
  loginUser,
  registerFailure,
  registerNewUser,
  registerSuccess,
} from '../actions/user.actions';
import { UserService } from '../../auth/services/user.service';
import { projectConstants, ProjectPages } from '../../../environment/environment';
import { SnackBarService } from '../../core/services/snackbar.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerNewUser),
      concatMap((action) =>
        this.userService.register(action.user).pipe(
          map((user) => registerSuccess({ user })),
          catchError((error) => {
            this.userService.previousEnteredEmail.next(action.user.email);
            return of(registerFailure({ error }));
          })
        )
      )
    );
  });

  registerSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.snackBarService.setSnackBar(projectConstants.userRegisterSuccess);
          this.router.navigate([`/${ProjectPages.Auth}/${ProjectPages.Login}`]);
          this.userService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      concatMap((action) =>
        this.userService.login(action.user).pipe(
          map((userAuth) => {
            localStorage.setItem('userEmail', action.user.email);
            localStorage.setItem('userAuthToken', JSON.stringify(userAuth));
            return loginSuccess({ userAuth });
          }),
          catchError((error) => {
            return of(loginFailure({ error }));
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.snackBarService.setSnackBar(projectConstants.userLoginSuccess);
          this.router.navigate([`/${ProjectPages.Empty}`]);
          this.userService.isExceptionSubject.next(false);
        })
      );
    },
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
