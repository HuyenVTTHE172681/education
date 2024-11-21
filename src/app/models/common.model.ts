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
