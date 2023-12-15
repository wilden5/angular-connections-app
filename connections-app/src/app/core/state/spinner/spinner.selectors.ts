import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRoot = createFeatureSelector<RootState>('isLoading');

export const selectSpinnerState = createSelector(
  selectRoot,
  (state) => state,
  (state) => state.isLoading
);
