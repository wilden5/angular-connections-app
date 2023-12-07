import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('peopleList');

export const selectPeopleList = createSelector(selectRootState, (state) => state.peopleList);
