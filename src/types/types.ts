export type FormRestType = {
  method: string;
  endpoint: string;
  bodyJSON: string;
  bodyText: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
};

export type FormRestDataType = {
  method: string;
  endpoint: string;
  body: object;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
};

export type RestAPI = Readonly<{
  getData: (inputData: FormRestType, headers: { [key: string]: string }, bodyData: object) => Promise<unknown>;
}>;
