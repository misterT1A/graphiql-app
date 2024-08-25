export type FormRestType = {
  method: string;
  endpoint: string;
  headerKey: string;
  headerValue: string;
  body: string;
};

export type RestAPI = Readonly<{
  getData: (inputData: FormRestType, headersCount: number, bodyData: object) => Promise<Response | unknown>;
}>;

