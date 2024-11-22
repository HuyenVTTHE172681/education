export interface IResponeList<T> {
  statusCode: number;
  message: string;
  status: string;
  data: {
    data: T[];
    recordsTotal: number;
    recordsFiltered: number;
  };
}


export interface IResponeListData<T> {
  statusCode: number;
  message: string;
  status: string;
  data: T;
}