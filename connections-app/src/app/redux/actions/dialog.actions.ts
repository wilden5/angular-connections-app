import { createAction, props } from '@ngrx/store';
import { IGroupMessageTransformed } from '../../core/models/group.model';
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
