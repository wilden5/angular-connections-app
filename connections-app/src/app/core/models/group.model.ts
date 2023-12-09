export interface IGroup {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IGroupItem[];
}

export interface IGroupItem {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
}

export interface IGroupItemTransformed {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

export interface GroupResponse {
  groupID: string;
}

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
