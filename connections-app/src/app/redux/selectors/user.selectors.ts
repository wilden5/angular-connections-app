import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('user');

export const selectCurrentUser = createSelector(selectRootState, (state) => state.currentUser);
