export type FormRestType = {
  method: string;
  endpoint: string;
  // body: string;
  headers: { key: string; value: string }[];
};

export type RestAPI = Readonly<{
  getData: (inputData: FormRestType, headers: { [key: string]: string }, bodyData: object) => Promise<unknown>;
}>;

