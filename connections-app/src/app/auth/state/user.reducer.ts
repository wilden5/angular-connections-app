import { createReducer, on } from '@ngrx/store';
import {
  loadProfileHttpSuccess,
  loadProfileStore,
  logoutSuccess,
  updateUserNameSuccess,
} from './user.actions';
import { IUserProfileInformationTransformed } from '../models/user.model';

export interface UserState {
  user: IUserProfileInformationTransformed;
}

export const initialUserState: UserState = {
  user: {
    name: '',
    email: '',
    uid: '',
    createdAt: '',
  },
};

export const userReducer = createReducer(
  initialUserState,
  on(
    loadProfileHttpSuccess,
    (state, { profileInformation }): UserState => ({ ...state, user: profileInformation })
  ),
  on(loadProfileStore, (state): UserState => ({ ...state })),
  on(
    updateUserNameSuccess,
    (state, { name }): UserState => ({ ...state, user: { ...state.user, name } })
  ),
  on(
    logoutSuccess,
    (state): UserState => ({
      ...state,
      user: {
        ...initialUserState.user,
      },
    })
  )
);
