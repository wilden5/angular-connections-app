import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('groupList');

export const selectGroupList = createSelector(selectRootState, (state) => state.groupList);
