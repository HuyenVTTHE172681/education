// Model for Slide
export class Slide {
  id!: string;
  name!: string;
  imageUrl?: string;
  isVideo!: number;
  link?: string;
  screen?: string;
  status!: number;
  order!: number;
  createdBy?: string | null;
  createdDate?: string | null;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
}
