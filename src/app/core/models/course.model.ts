import { ClassRoom } from './classRoom.model';
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';

export class Course {
  id: string = '';
  name: string = '';
  code: string = '';
  courseAvatar: string = '';
  courseBanner: string = '';
  courseInfo1: string = '';
  courseInfo2: string = '';
  courseThumbnail: string = '';
  averageRating: number = 0;
  totalRating: number = 0;
  totalStudent: number = 0;
  price: number = 0;
  priceDiscount: number = 0;
  promotionTime: string = '';
  createdDate: string = '';
  createdBy: string = '';
  modifiedDate: string = '';
  modifiedBy: string = '';
  shortSummary: string = '';
  isShowHome: number = 0;
  isPassCourse: boolean = false;
  classRoom: ClassRoom[] = [];
  classRoomId: string = '';
  classRoomName: string | null = null;
  teachers: Teacher[] = [];
  teacherId: string | null = null;
  teacherName: string | null = null;
  studentNum: number = 0;
  status: number = 1;
  courseYears: CourseYear[] = [];
  courseYearId: string | null = null;
  courseYearName: string | null = null;
  subject: Subject[] = [];
  subjectId: string = '';
  subjectName: string | null = null;
}

export class CourseYear {
  id: string = '';
  name: string = '';
  description: string = '';
  status: number = 0;
  createdBy: string = '';
  createdDate: string = '';
  modifiedBy: string = '';
  modifiedDate: string | null = null;
  totalFiltered: number | null = null;
}
