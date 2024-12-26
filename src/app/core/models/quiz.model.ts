// Model for Quiz
export class Quiz {
  id!: string;
  title!: string;
  content?: string;
  avatar?: string;
  categoryId?: string;
  categoryName?: string | null;
  shortContent?: string;
  status!: number;
  tags?: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  order!: number;
  rate!: number;
  view!: number;
}
