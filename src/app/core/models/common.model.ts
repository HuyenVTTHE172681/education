export interface IResponseList<T> {
  statusCode: number;
  message: string;
  status: string;
  data: {
    data: T[];
    recordsTotal: number;
    recordsFiltered: number;
  };
}


export interface IResponseListData<T> {
  statusCode: number;
  message: string;
  status: string;
  data: T;
}