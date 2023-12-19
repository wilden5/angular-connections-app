export interface IGroupDialogResponse {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IGroupMessage[];
}

export interface IGroupMessage {
  authorID: { S: string };
  message: { S: string };
  createdAt: { S: string };
}

export interface IGroupMessageTransformed {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface IDialogList {
  [groupID: string]: {
    messages: IGroupMessageTransformed[];
    since: number;
  };
}

export interface INewMessage {
  groupID: string;
  message: string;
}
