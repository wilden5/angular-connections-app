import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('peopleList');

export const selectPeopleList = createSelector(selectRootState, (state) => state.peopleList);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectUserById = (id: string) =>
  createSelector(selectPeopleList, (state) => state.find((user) => user.uid === id)?.name || id);
