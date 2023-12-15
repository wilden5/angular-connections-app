export interface IGroupResponse {
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

export interface IGroupCreationResponse {
  groupID: string;
}
