import { createReducer, on } from '@ngrx/store';
import { RootState } from '../root.state';
import { loadProfileHttpSuccess } from '../actions/user.actions';

export const initialRootState: RootState = {
  user: undefined,
};

export const userReducer = createReducer(
  initialRootState,
  on(
    loadProfileHttpSuccess,
    (state, { profileInformation }): RootState => ({ ...state, user: profileInformation })
  )
);
