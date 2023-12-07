import { createAction, props } from '@ngrx/store';
import { IServerError } from '../../core/models/server-error.model';
import { IConversationId } from '../../core/models/conversation.model';

export const createNewConversation = createAction(
  '[CON] Create New Conversation Request',
  props<{ companionId: string }>()
);

export const createNewConversationSuccess = createAction(
  '[CON] Create New Conversation Success',
  props<{ conversationId: IConversationId }>()
);

export const createNewConversationFailure = createAction(
  '[CON] Create New Conversation Failure',
  props<{ error: IServerError }>()
);
