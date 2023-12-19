import { createAction, props } from '@ngrx/store';
import { IServerError } from '../../core/models/server-error.model';
import { IConversationItemTransformed } from '../model/conversation.model';

export const createNewConversation = createAction(
  '[CON] Create New Conversation Request',
  props<{ companionId: string }>()
);

export const createNewConversationSuccess = createAction(
  '[CON] Create New Conversation Success',
  props<{ conversation: IConversationItemTransformed }>()
);

export const createNewConversationFailure = createAction(
  '[CON] Create New Conversation Failure',
  props<{ error: IServerError }>()
);

export const loadConversationList = createAction('[CON] Load Conversation List Request');

export const loadConversationListSuccess = createAction(
  '[CON] Load Conversation List Success',
  props<{ conversationList: IConversationItemTransformed[] }>()
);

export const loadConversationListFailure = createAction(
  '[CON] Load Conversation List Failure',
  props<{ error: IServerError }>()
);

export const loadConversationListStore = createAction('[CON] Load Conversation List Store');
