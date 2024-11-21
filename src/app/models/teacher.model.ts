// Model for Teacher
export class Teacher {
  id!: string;
  name!: string;
  description?: string;
  descriptionShort?: string;
  avatar?: string;
  order!: number;
  address?: string | null;
  birthday?: string | null;
  email?: string | null;
  identityNo?: string | null;
  phone?: string | null;
  userName?: string | null;
  status!: number;
  totalStudent?: number | null;
  averageRate?: number | null;
  createdBy?: string | null;
  createdDate?: string;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
}
