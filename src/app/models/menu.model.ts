// Action Model
export interface Action {
  action_id: string;
}

// Menu Item Model
export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string | null;
  path: string;
  parentId?: string | null;
  icon: string;
  status: number;
  screen: string;
  code: string;
  order: number;
  actions?: Action[] | null;
  createdDate?: string | null;
  modifiedDate?: string | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
  totalFiltered?: number | null;
}
