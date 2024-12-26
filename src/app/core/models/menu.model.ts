export interface MenuData {
  recordsTotal: number;
  recordsFiltered: number;
  statusCode: number;
  message: string;
  status: string;
  data: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string | null;
  icon?: string;
  path?: string;
  parentId?: string;
  order?: number;
  screen?: string;
  status?: number;
  childs?: MenuItem[];
  actions?: string; // JSON string of actions
  createdBy?: string | null;
  createdDate?: string | null;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
}
