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
