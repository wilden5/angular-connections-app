import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '../../../redux/root.state';

export const selectConversationHistoryState =
  createFeatureSelector<RootState>('conversationHistoryList');

export const selectConversationHistoryList = createSelector(
  selectConversationHistoryState,
  (state) => state.conversationHistoryList
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectSpecificConversationById = (props: { conversationID: string }) =>
  createSelector(
    selectConversationHistoryList,
    (conversationList) => conversationList[props.conversationID]
  );
