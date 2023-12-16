import {
  IUserProfileInformation,
  IUserProfileInformationTransformed,
} from '../auth/models/user.model';
import { IPerson, IPersonTransformed } from '../core/models/people.model';
import { IGroupItem, IGroupItemTransformed } from '../group/model/group.model';
import { IGroupMessage, IGroupMessageTransformed } from '../group/model/dialog.model';
import {
  IConversationItem,
  IConversationItemTransformed,
} from '../conversation/model/conversation.model';
import {
  IDiscussionMessage,
  IDiscussionMessageTransformed,
} from '../conversation/model/discussion.model';

export const transformProfileInformation = (
  data: IUserProfileInformation
): IUserProfileInformationTransformed => {
  return {
    createdAt: data.createdAt.S,
    uid: data.uid.S,
    email: data.email.S,
    name: data.name.S,
  };
};

export const transformPersonInformation = (peopleList: IPerson[]): IPersonTransformed[] => {
  return peopleList.map((item) => ({
    name: item.name.S,
    uid: item.uid.S,
  }));
};

export const transformGroupInformation = (groupItem: IGroupItem[]): IGroupItemTransformed[] => {
  return groupItem.map((item) => ({
    id: item.id.S,
    name: item.name.S,
    createdAt: item.createdAt.S,
    createdBy: item.createdBy.S,
  }));
};

export const transformGroupMessage = (groupItem: IGroupMessage[]): IGroupMessageTransformed[] => {
  return groupItem.map((item) => ({
    authorID: item.authorID.S,
    message: item.message.S,
    createdAt: item.createdAt.S,
  }));
};

export const transformConversationInformation = (
  groupItem: IConversationItem[]
): IConversationItemTransformed[] => {
  return groupItem.map((item) => ({
    id: item.id.S,
    companionID: item.companionID.S,
  }));
};

export const transformDiscussionMessage = (
  groupItem: IDiscussionMessage[]
): IDiscussionMessageTransformed[] => {
  return groupItem.map((item) => ({
    authorID: item.authorID.S,
    message: item.message.S,
    createdAt: item.createdAt.S,
  }));
};
