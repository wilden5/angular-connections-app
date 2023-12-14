import { IUserProfileInformationTransformed } from '../auth/models/user.model';
import { IDialogList, IGroupItemTransformed } from '../core/models/group.model';
import { IPersonTransformed } from '../core/models/people.model';
import {
  IConversationItemTransformed,
  IConversationListObject,
} from '../core/models/conversation.model';
import { ISpinnerStatus } from '../core/models/spinner.model';

export interface RootState {
  readonly isLoading: ISpinnerStatus;
  readonly user: IUserProfileInformationTransformed;
  readonly groupList: IGroupItemTransformed[];
  readonly peopleList: IPersonTransformed[];
  readonly conversationList: IConversationItemTransformed[];
  readonly dialogList: IDialogList;
  readonly conversationHistoryList: IConversationListObject;
}
