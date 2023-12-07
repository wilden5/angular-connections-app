export interface IPeopleList {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  Count: number;
  Items: IPerson[];
}

export interface IPerson {
  name: { S: string };
  uid: { S: string };
}

export interface IPersonTransformed {
  name: string;
  uid: string;
}
