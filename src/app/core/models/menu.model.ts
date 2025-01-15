
export class Menu {
  id = '';
  name = '';
  nameEn = '';
  icon = '';
  path = '';
  parentId = '';
  order = 1;
  screen = '';
  status = 1;
  childs?: MenuSub[] = [];
  actions = '';
  createdBy = '';
  createdDate = '';
  modifiedBy = '';
  modifiedDate = '';
  code = '';
}

export class MenuSub {
  id = '';
  name = '';
  nameEn = '';
  icon = '';
  path = '';
  parentId = '';
  order = 1;
  screen = '';
  status = 1;
  childs = [];
  actions = '';
  createdBy = '';
  createdDate = '';
  modifiedBy = '';
  modifiedDate = '';
  code = '';
}