// Model for Teacher
export class Teacher {
  id: string = '';
  name: string = '';
  courseId: string = '';
  accountId: string | null = null;
  address: string | null = null;
  avatar: string | null = null;
  averageRate: number = 0;
  birthday: string | null = null;
  createdBy: string | null = null;
  createdDate: string = '';
  description: string = '';
  descriptionShort: string = '';
  email: string | null = null;
  identityNo: string | null = null;
  modifiedBy: string | null = null;
  modifiedDate: string | null = null;
  order: number = 0;
  phone: string | null = null;
  status: number = 0;
  totalFiltered: number | null = null;
  totalStudent: number = 0;
  username: string | null = null;
}
