import { IUserProfileInformation } from '../auth/models/user.model';
import { IGroupItemTransformed } from '../core/models/group.model';

export interface RootState {
  readonly user: IUserProfileInformation;
  readonly groupList: IGroupItemTransformed[];
}
