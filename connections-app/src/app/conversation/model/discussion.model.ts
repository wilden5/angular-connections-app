export interface IDiscussionResponse {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IDiscussionMessage[];
}

export interface IDiscussionMessage {
  authorID: { S: string };
  message: { S: string };
  createdAt: { S: string };
}

export interface IDiscussionMessageTransformed {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface IDiscussionList {
  [conversationID: string]: {
    messages: IDiscussionMessageTransformed[];
    since: number;
  };
}

export interface INewDiscussionMessage {
  conversationID: string;
  message: string;
}
