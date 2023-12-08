import { createReducer, on } from '@ngrx/store';
import { IConversationItemTransformed } from '../../core/models/conversation.model';
import {
  createNewConversationSuccess,
  loadConversationListStore,
  loadConversationListSuccess,
} from '../actions/conversation.actions';

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
  })
);
