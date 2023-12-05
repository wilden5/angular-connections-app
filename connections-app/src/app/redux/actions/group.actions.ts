import { createAction, props } from '@ngrx/store';
import { IGroupItemTransformed } from '../../core/models/group.model';
import { IServerError } from '../../core/models/server-error.model';

export const loadGroupList = createAction('[GROUP] Load Group List Request');

export const loadGroupListHttpSuccess = createAction(
  '[GROUP] Load Group List Http Request Success',
  props<{ groupList: IGroupItemTransformed[] }>()
);

export const loadGroupListHttpFailure = createAction(
  '[GROUP] Load Group List Http Request Failure',
  props<{ error: IServerError }>()
);

export const loadGroupListStore = createAction('[GROUP] Load Group List Store Request');
