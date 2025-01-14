// Model for Slide
export class Slide {
  id = '';
  name = '';
  imageUrl = '';
  isVideo = 0;
  link = '';
  screen = '';
  status = 0;
  order = 1;
  createdBy = '';
  createdDate = '';
  modifiedBy = '';
  modifiedDate = '';
  totalFiltered = 0;
}

export class Step {
  createdBy = '';
  createdDate = '';
  delay = 0;
  description = '';
  id = '';
  image = '';
  isParent = '';
  modifiedBy = '';
  modifiedDate = '';
  name = '';
  order = 0;
  screen = '';
  showNavigation = 0;
  status = 0;
  subTitle = '';
  theme = '';
  title = '';
  totalFiltered = 0
}

export class NewsItemStep {
  createdBy = '';
  createdDate = '';
  delay = 0;
  description = '';
  id = '';
  image = '';
  isParent = '';
  modifiedBy = '';
  modifiedDate = '';
  name = '';
  order = 0;
  screen = '';
  showNavigation = 0;
  status = 0;
  subTitle = '';
  theme = '';
  title = '';
  totalFiltered = 0;
  steps: Step[] = [];
}

export class Footer {
  content = '';
  createdBy = '';
  createdDate = '';
  id = '';
  modifiedBy = '';
  modifiedDate = '';
  order = 1;
  position = '';
  status = 0;
  title = '';
  totalFiltered = 1;
}

export class Feedback {
  content = '';
  createdBy = '';
  createdDate = '';
  email = '';
  id = '';
  modifiedBy = '';
  modifiedDate = '';
  phone = '';
  totalFiltered = 0;
}

export class Notification {
  id = '';
  accounts: any = null;
  address: any = null;
  avatar: any = null;
  content = '';
  createdBy = '';
  createdDate = '';
  email: any = null;
  fromAddress: any = null;
  fromAvatar: any = null;
  fromEmail: any = null;
  fromIdentityNo: any = null;
  fromName: any = null;
  fromPhone: any = null;
  fromUserName: any = null;
  identityNo: any = null;
  isManual = false;
  isRead = 0;
  isShowAdmin = false;
  isShowUser = true;
  key = '';
  modifiedBy = '';
  modifiedDate: any = null;
  name: any = null;
  notificationTypeId = '';
  phone: any = null;
  roleId = '';
  routerLink = '';
  status = true;
  title = '';
  totalFiltered = 0;
  userName: any = null;
}

export class AdminNotifications {
  accounts: any = null;
  address: any = null;
  avatar: any = null;
  content = '';
  createdBy = '';
  createdDate = '';
  email: any = null;
  fromAddress: any = null;
  fromAvatar: any = null;
  fromEmail: any = null;
  fromIdentityNo: any = null;
  fromName: any = null;
  fromPhone: any = null;
  fromUserName: any = null;
  id = '';
  identityNo: any = null;
  isManual = false;
  isRead = 0;
  isShowAdmin = false;
  isShowUser = true;
  key: any = null;
  modifiedBy = '';
  modifiedDate: any = null;
  name: any = null;
  notificationTypeId = '';
  phone: any = null;
  roleId = '';
  routerLink = '';
  status = true;
  title = '';
  totalFiltered = 0;
  userName: any = null;
}

