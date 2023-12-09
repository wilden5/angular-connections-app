import { createReducer, on } from '@ngrx/store';
import { IDialogList } from '../../core/models/group.model';
import { loadGroupDialogHttpSuccess } from '../actions/dialog.actions';

export interface DialogState {
  dialogList: IDialogList;
}

export const initialDialogState: DialogState = {
  dialogList: {},
};

export const dialogReducer = createReducer(
  initialDialogState,
  on(loadGroupDialogHttpSuccess, (state, { groupMessages, groupID, since }): DialogState => {
    return {
      ...state,
      dialogList: {
        ...state.dialogList,
        [groupID]: {
          messages: groupMessages,
          since,
        },
      },
    };
  })
);
