import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('user');

export const selectUser = createSelector(selectRootState, (state) => state.user);

export const selectUserName = createSelector(selectRootState, (state) => state.user.name);
