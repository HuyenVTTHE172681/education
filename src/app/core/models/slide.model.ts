// Model for Slide
export class Slide {
  id = '';
  name = '';
  imageUrl = '';
  isVideo = 0;
  link = '';
  screen = '';
  status = 0;
  order =  1;
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

