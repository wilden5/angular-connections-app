import { createAction, props } from '@ngrx/store';
import { IServerError } from '../../core/models/server-error.model';
import {
  IConversationItemTransformed,
  IConversationMessageTransformed,
  INewConversationMessage,
} from '../../core/models/conversation.model';

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

export const loadSpecificConversation = createAction(
  '[CON] Load Specific Conversation Request',
  props<{ conversationID: string; since: number }>()
);

export const loadSpecificConversationSuccess = createAction(
  '[CON] Load Specific Conversation Success',
  props<{
    conversationMessages: IConversationMessageTransformed[];
    conversationID: string;
    since: number;
  }>()
);

export const loadSpecificConversationFailure = createAction(
  '[CON] Load Specific Conversation Failure',
  props<{ error: IServerError }>()
);

export const sendConversationMessage = createAction(
  '[CON] Send Conversation Message Request',
  props<{
    conversationMessage: INewConversationMessage;
  }>()
);

export const sendConversationMessageSuccess = createAction(
  '[CON] Send Conversation Message Success',
  props<{
    conversationMessage: INewConversationMessage;
  }>()
);

export const sendConversationMessageFailure = createAction(
  '[CON] Send Conversation Message Failure',
  props<{ error: IServerError }>()
);

export const deleteConversation = createAction(
  '[CON] Delete Conversation Request',
  props<{ id: string }>()
);

export const deleteConversationSuccess = createAction(
  '[CON] Delete Conversation Success',
  props<{ id: string }>()
);

export const deleteConversationFailure = createAction(
  '[CON] Delete Conversation Failure',
  props<{ error: IServerError }>()
);
