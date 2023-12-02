export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IUserAuthenticated {
  token: string;
  uid: string;
}

export interface IUserProfileHeaders {
  uid: string;
  email: string;
  token: string;
}

export interface IServerProfileInformation {
  createdAt: { S: string };
  uid: { S: string };
  email: { S: string };
  name: { S: string };
}

export interface IUserProfileInformation {
  createdAt: string;
  uid: string;
  email: string;
  name: string;
}
