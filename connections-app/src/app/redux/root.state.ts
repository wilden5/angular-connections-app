import { IUser } from '../auth/models/user.model';

export interface RootState {
  readonly currentUser?: IUser;
}
