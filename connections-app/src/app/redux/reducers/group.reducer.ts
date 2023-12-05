import { createReducer, on } from '@ngrx/store';
import { IGroupItemTransformed } from '../../core/models/group.model';
import { loadGroupListHttpSuccess, loadGroupListStore } from '../actions/group.actions';

export interface GroupState {
  groupList: IGroupItemTransformed[];
}

export const initialGroupState: GroupState = {
  groupList: [],
};

export const groupReducer = createReducer(
  initialGroupState,
  on(loadGroupListHttpSuccess, (state, { groupList }): GroupState => ({ ...state, groupList })),
  on(loadGroupListStore, (state): GroupState => ({ ...state }))
);
