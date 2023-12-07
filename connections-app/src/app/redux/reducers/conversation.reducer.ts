import { createReducer, on } from '@ngrx/store';
import { IConversationId } from '../../core/models/conversation.model';
import { createNewConversationSuccess } from '../actions/conversation.actions';

export interface ConversationState {
  conversationIds: IConversationId[];
}

export const initialConversationState: ConversationState = {
  conversationIds: [],
};

export const conversationReducer = createReducer(
  initialConversationState,
  on(createNewConversationSuccess, (state, { conversationId }): ConversationState => {
    return { ...state, conversationIds: [...state.conversationIds, conversationId] };
  })
);
