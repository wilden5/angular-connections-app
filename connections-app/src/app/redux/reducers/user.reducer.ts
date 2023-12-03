import { createReducer, on } from '@ngrx/store';
import { RootState } from '../root.state';
import {
  loadProfileHttpSuccess,
  loadProfileStore,
  logoutSuccess,
  updateUserNameSuccess,
} from '../actions/user.actions';

export const initialRootState: RootState = {
  user: {
    name: '',
    email: '',
    uid: '',
    createdAt: '',
  },
};

export const userReducer = createReducer(
  initialRootState,
  on(
    loadProfileHttpSuccess,
    (state, { profileInformation }): RootState => ({ ...state, user: profileInformation })
  ),
  on(loadProfileStore, (state): RootState => ({ ...state })),
  on(
    updateUserNameSuccess,
    (state, { name }): RootState => ({ ...state, user: { ...state.user, name } })
  ),
  on(
    logoutSuccess,
    (state): RootState => ({
      ...state,
      user: {
        ...initialRootState.user,
      },
    })
  )
);
