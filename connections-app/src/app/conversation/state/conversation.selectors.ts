import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../../core/state/root.state';

export const selectRootState = createFeatureSelector<RootState>('conversationList');

export const selectConversationList = createSelector(
  selectRootState,
  (state) => state.conversationList
);

export const selectConversationCompanionIDs = createSelector(
  selectConversationList,
  (conversationList) => {
    return conversationList.map((item) => item.companionID);
  }
);
