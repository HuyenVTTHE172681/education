// Model for ClassRoom
export class ClassRoom {
  id!: string;
  name!: string;
  code!: string;
  status!: number;
  order!: number;
  avatar?: string;
  courseId?: string | null;
  subjectId?: string | null;
  createdBy?: string | null;
  createdDate?: string;
  modifiedBy?: string | null;
  modifiedDate?: string;
}
