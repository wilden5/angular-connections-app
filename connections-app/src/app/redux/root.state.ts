import { IUserProfileInformation } from '../auth/models/user.model';

export interface RootState {
  readonly user: IUserProfileInformation;
}
