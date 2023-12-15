import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../../redux/root.state';

export const selectRootState = createFeatureSelector<RootState>('groupList');

export const selectGroupList = createSelector(selectRootState, (state) => state.groupList);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectGroupById = (id: string, currentUserId: string) =>
  createSelector(selectGroupList, (state) => {
    const group = state.find((item) => item.id === id);
    return group && group.createdBy === currentUserId;
  });
