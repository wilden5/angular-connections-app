import { createReducer, on } from '@ngrx/store';
import { IConversationItemTransformed } from '../model/conversation.model';
import {
  createNewConversationSuccess,
  loadConversationListStore,
  loadConversationListSuccess,
} from './conversation.actions';
import { deleteDiscussionSuccess } from './discussion/discussion.actions';

export interface ConversationState {
  conversationList: IConversationItemTransformed[];
}

export const initialConversationState: ConversationState = {
  conversationList: [],
};

export const conversationReducer = createReducer(
  initialConversationState,
  on(
    loadConversationListSuccess,
    (state, { conversationList }): ConversationState => ({ ...state, conversationList })
  ),
  on(loadConversationListStore, (state): ConversationState => ({ ...state })),
  on(createNewConversationSuccess, (state, { conversation }): ConversationState => {
    return {
      ...state,
      conversationList: [...state.conversationList, conversation],
    };
  }),
  on(deleteDiscussionSuccess, (state, { id }) => {
    return {
      ...state,
      conversationList: [...state.conversationList.filter((item) => item.id !== id)],
    };
  })
);
