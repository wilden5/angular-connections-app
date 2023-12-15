import { createAction, props } from '@ngrx/store';
import { IDiscussionMessageTransformed, INewDiscussionMessage } from '../../model/discussion.model';
import { IServerError } from '../../../core/models/server-error.model';

export const loadDiscussion = createAction(
  '[CON] Load Discussion Request',
  props<{ conversationID: string; since: number }>()
);

export const loadDiscussionSuccess = createAction(
  '[CON] Load Discussion Success',
  props<{
    conversationMessages: IDiscussionMessageTransformed[];
    conversationID: string;
    since: number;
  }>()
);

export const loadDiscussionFailure = createAction(
  '[CON] Load Discussion Failure',
  props<{ error: IServerError }>()
);

export const sendDiscussionMessage = createAction(
  '[CON] Send Discussion Message Request',
  props<{
    conversationMessage: INewDiscussionMessage;
  }>()
);

export const sendDiscussionMessageSuccess = createAction(
  '[CON] Send Discussion Message Success',
  props<{
    conversationMessage: INewDiscussionMessage;
  }>()
);

export const sendDiscussionMessageFailure = createAction(
  '[CON] Send Discussion Message Failure',
  props<{ error: IServerError }>()
);

export const deleteDiscussion = createAction(
  '[CON] Delete Discussion Request',
  props<{ id: string }>()
);

export const deleteDiscussionSuccess = createAction(
  '[CON] Delete Discussion Success',
  props<{ id: string }>()
);

export const deleteDiscussionFailure = createAction(
  '[CON] Delete Discussion Failure',
  props<{ error: IServerError }>()
);
