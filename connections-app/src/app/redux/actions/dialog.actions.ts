import { createAction, props } from '@ngrx/store';
import { IGroupMessageTransformed, INewMessage } from '../../core/models/group.model';
import { IServerError } from '../../core/models/server-error.model';

export const loadGroupDialog = createAction(
  '[DIALOG] Load Group Dialog Request',
  props<{ groupID: string; since: number }>()
);

export const loadGroupDialogHttpSuccess = createAction(
  '[DIALOG] Load Group Dialog Http Success',
  props<{ groupMessages: IGroupMessageTransformed[]; groupID: string; since: number }>()
);

export const loadGroupDialogHttpFailure = createAction(
  '[DIALOG] Load Group Dialog Http Failure',
  props<{ error: IServerError }>()
);

export const sendNewMessage = createAction(
  '[DIALOG] Send New Message Request',
  props<{
    newMessage: INewMessage;
  }>()
);

export const sendNewMessageSuccess = createAction(
  '[DIALOG] Send New Message Success',
  props<{
    newMessage: INewMessage;
  }>()
);

export const sendNewMessageFailure = createAction(
  '[DIALOG] Send New Message Failure',
  props<{ error: IServerError }>()
);
