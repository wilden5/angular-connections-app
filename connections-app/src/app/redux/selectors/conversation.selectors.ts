import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('conversationIds');

export const selectConversationIds = createSelector(
  selectRootState,
  (state) => state.conversationIds
);
