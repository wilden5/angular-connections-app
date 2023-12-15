import { createAction, props } from '@ngrx/store';
import { IGroupCreationResponse, IGroupItemTransformed } from '../model/group.model';
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

export const loadGroupListDirectHttp = createAction('[GROUP] Load Group List Direct Http Request');

export const deleteGroup = createAction('[GROUP] Delete Group Request', props<{ id: string }>());

export const deleteGroupSuccess = createAction(
  '[GROUP] Delete Group Request Success',
  props<{ id: string }>()
);

export const deleteGroupFailure = createAction(
  '[GROUP] Delete Group Request Failure',
  props<{ error: IServerError }>()
);

export const createGroup = createAction('[GROUP] Create Group Request', props<{ name: string }>());

export const createGroupSuccess = createAction(
  '[GROUP] Create Group Success',
  props<{ response: IGroupCreationResponse; name: string }>()
);

export const createGroupFailure = createAction(
  '[GROUP] Create Group Failure',
  props<{ error: IServerError }>()
);
