export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IUserAuthenticated {
  token: string;
  uid: string;
}
