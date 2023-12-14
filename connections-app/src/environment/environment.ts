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
  GroupId = ':id',
  Conversation = 'conversation',
  ConversationId = ':id',
}

export const projectConstants = {
  userRegisterSuccess: 'You have been registered!',
  userLoginSuccess: 'You have been logged in!',
  formFieldRequired: 'This field is required',
  formNameLength: 'Cannot have more than 40 symbols',
  formNameRegex: 'Should consist of letters/spaces only',
  formEmail: 'Should be a valid email',
};
