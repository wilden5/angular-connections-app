import { createAction, props } from '@ngrx/store';
import { IUser, IUserAuthenticated } from '../../auth/models/user.model';
import { IServerError } from '../../core/models/server-error.model';

export const registerNewUser = createAction('[USER] Register New User', props<{ user: IUser }>());

export const registerSuccess = createAction('[USER] Register Success', props<{ user: IUser }>());

export const registerFailure = createAction(
  '[USER] Register Failure',
  props<{ error: IServerError }>()
);

export const loginUser = createAction('[USER] Login user', props<{ user: IUser }>());

export const loginSuccess = createAction(
  '[USER] Login Success',
  props<{ userAuth: IUserAuthenticated }>()
);

export const loginFailure = createAction('[USER] Login Failure', props<{ error: IServerError }>());
