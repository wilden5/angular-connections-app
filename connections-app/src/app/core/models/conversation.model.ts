export interface IConversationList {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IConversation[];
}

export interface IConversation {
  id: { S: string };
  companionID: { S: string };
}

export interface IConversationId {
  conversationID: string;
}
