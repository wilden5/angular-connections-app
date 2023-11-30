import { createReducer, on } from '@ngrx/store';
import { RootState } from '../root.state';

export const initialRootState: RootState = {
  currentUser: undefined,
};

export const userReducer = createReducer(initialRootState);
