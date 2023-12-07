export const environment = {
  production: false,
};

export enum ProjectPages {
  Empty = '',
  Auth = 'auth',
  Login = 'signin',
  Registration = 'signup',
  Profile = 'profile',
  Group = 'group',
  Conversation = 'conversation',
}

export const projectConstants = {
  userRegisterSuccess: 'You have been registered!',
  userLoginSuccess: 'You have been logged in!',
};
