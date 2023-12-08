import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../root.state';

export const selectRootState = createFeatureSelector<RootState>('conversationIds');

export const selectConversationList = createSelector(
  selectRootState,
  (state) => state.conversationList
);

export const selectCompanionIDs = createSelector(selectConversationList, (conversationList) => {
  return conversationList.map((item) => item.companionID);
});
