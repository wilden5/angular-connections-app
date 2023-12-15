import { IUserProfileInformationTransformed } from '../auth/models/user.model';
import { IGroupItemTransformed } from '../group/model/group.model';
import { IPersonTransformed } from '../core/models/people.model';
import {
  IConversationItemTransformed,
  IConversationListObject,
} from '../core/models/conversation.model';
import { ISpinnerStatus } from '../core/models/spinner.model';
import { IDialogList } from '../group/model/dialog.model';

export interface RootState {
  readonly isLoading: ISpinnerStatus;
  readonly user: IUserProfileInformationTransformed;
  readonly groupList: IGroupItemTransformed[];
  readonly peopleList: IPersonTransformed[];
  readonly conversationList: IConversationItemTransformed[];
  readonly dialogList: IDialogList;
  readonly conversationHistoryList: IConversationListObject;
}
