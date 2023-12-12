import { createReducer, on } from '@ngrx/store';
import { IConversationListObject } from '../../core/models/conversation.model';
import {
  deleteConversationSuccess,
  loadSpecificConversationSuccess,
} from '../actions/conversation.actions';

export interface ConversationHistoryState {
  conversationHistoryList: IConversationListObject;
}

export const initialConversationHistoryState: ConversationHistoryState = {
  conversationHistoryList: {},
};

export const specificConversationReducer = createReducer(
  initialConversationHistoryState,
  on(
    loadSpecificConversationSuccess,
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
  on(deleteConversationSuccess, (state, { id }): ConversationHistoryState => {
    const { [id]: removeItem, ...remainingItems } = state.conversationHistoryList;
    return { ...state, conversationHistoryList: remainingItems };
  })
);
