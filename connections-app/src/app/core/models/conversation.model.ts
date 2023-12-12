export interface IConversationList {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IConversationItem[];
}

export interface IConversationItem {
  id: { S: string };
  companionID: { S: string };
}

export interface IConversationItemTransformed {
  id: string;
  companionID: string;
}

export interface IConversationId {
  conversationID: string;
  companionID: string;
}

export interface IConversationResponse {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IConversationMessage[];
}

export interface IConversationMessage {
  authorID: { S: string };
  message: { S: string };
  createdAt: { S: string };
}

export interface IConversationMessageTransformed {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface IConversationListObject {
  [conversationID: string]: {
    messages: IConversationMessageTransformed[];
    since: number;
  };
}

export interface INewConversationMessage {
  conversationID: string;
  message: string;
}
