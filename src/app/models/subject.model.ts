import { ClassRoom } from './classRoom.model';
import { Course } from './course.model';

export class Subject {
  id = '';
  name = '';
  order = 0;
  status = 0;
  avatar = '';
  classRoomIds = '';
  classRooms: ClassRoom[] = [];
  courses?: Course[];
  createdBy = '';
  createdDate = '';
  modifiedBy = '';
  modifiedDate: any = null;
  totalFiltered = 0;
}
