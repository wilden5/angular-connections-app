import { createReducer, on } from '@ngrx/store';
import { IDiscussionList } from '../../model/discussion.model';
import { deleteDiscussionSuccess, loadDiscussionSuccess } from './discussion.actions';

export interface ConversationHistoryState {
  conversationHistoryList: IDiscussionList;
}

export const initialConversationHistoryState: ConversationHistoryState = {
  conversationHistoryList: {},
};

export const discussionReducer = createReducer(
  initialConversationHistoryState,
  on(
    loadDiscussionSuccess,
    (state, { conversationMessages, conversationID, since }): ConversationHistoryState => {
      const existingMessageHistory = state.conversationHistoryList[conversationID]?.messages || [];
      return {
        ...state,
        conversationHistoryList: {
          ...state.conversationHistoryList,
          [conversationID]: {
            messages: [...existingMessageHistory, ...conversationMessages],
            since,
          },
        },
      };
    }
  ),
  on(deleteDiscussionSuccess, (state, { id }): ConversationHistoryState => {
    const { [id]: removeItem, ...remainingItems } = state.conversationHistoryList;
    return { ...state, conversationHistoryList: remainingItems };
  })
);
