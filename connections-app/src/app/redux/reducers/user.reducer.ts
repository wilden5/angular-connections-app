import { createReducer, on } from '@ngrx/store';
import { RootState } from '../root.state';
import { loginSuccess } from '../actions/user.actions';

export const initialRootState: RootState = {
  userAuthToken: undefined,
};

export const userReducer = createReducer(
  initialRootState,
  on(loginSuccess, (state, { userAuth }): RootState => ({ ...state, userAuthToken: userAuth }))
);
