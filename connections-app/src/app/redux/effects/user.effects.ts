import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  loadProfileHttp,
  loadProfileHttpFailure,
  loadProfileHttpSuccess,
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
import { IUserProfileHeaders } from '../../auth/models/user.model';

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
            const userObject: IUserProfileHeaders = {
              uid: userAuth.uid,
              email: action.user.email,
              token: userAuth.token,
            };
            localStorage.setItem('userObject', JSON.stringify(userObject));
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

  profile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProfileHttp),
      concatMap(() =>
        this.userService.getProfileInformation().pipe(
          map((profileInformation) => loadProfileHttpSuccess({ profileInformation })),
          catchError((error) => {
            return of(loadProfileHttpFailure({ error }));
          })
        )
      )
    );
  });

  profileSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadProfileHttpSuccess),
        tap(() => {
          this.snackBarService.setSnackBar('Profile information was received!');
        })
      );
    },
    { dispatch: false }
  );

  profileFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadProfileHttpFailure),
        tap((action) => {
          this.snackBarService.setSnackBar(action.error.error.message);
        })
      );
    },
    { dispatch: false }
  );
}
