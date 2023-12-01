import { IUserAuthenticated } from '../auth/models/user.model';

export interface RootState {
  readonly userAuthToken?: IUserAuthenticated;
}
