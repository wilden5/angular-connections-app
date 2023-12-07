import { IUserProfileInformation } from '../auth/models/user.model';
import { IGroupItemTransformed } from '../core/models/group.model';
import { IPersonTransformed } from '../core/models/people.model';

export interface RootState {
  readonly user: IUserProfileInformation;
  readonly groupList: IGroupItemTransformed[];
  readonly peopleList: IPersonTransformed[];
}
