import { ClassRoom } from './classRoom.model'; // Giả sử bạn có ClassRoom model
import { Course } from './course.model'; // Giả sử bạn có Course model
import { Quiz } from './quiz.model';

export class Test {
  id: string = '';
  name: string = '';
  description: string | null = null;
  time: number = 0;
  isAutoSendMail: number = 0;
  isAutoSort: number = 0;
  isFree: number = 0;
  isHaveTestUser: number = 0;
  isNotification: number | null = null;
  isShowInAbilityTest: number = 0;
  isSpecial: number = 0;
  isTestAttacked: number = 0;
  isTestPass: number | null = null;
  isTestViewed: number = 0;
  lessonLink: string | null = null;
  livestreamAvatar: string | null = null;
  livestreamCode: string | null = null;
  livestreamDate: string | null = null;
  livestreamGroup: string | null = null;
  livestreamLink: string | null = null;
  livestreamTeacher: string | null = null;
  modifiedBy: string | null = null;
  modifiedDate: string | null = null;
  numberOfTest: number = 0;
  numberQuestionPass: number = 0;
  order: number = 0;
  pointShowLessonLink: number = 0;
  quizzs: Quiz[] = [];
  relationTests: any | null = null;
  remainMinute: number = 0;
  status: number = 0;
  testCategoryCode: string | null = null;
  testCategoryId: string | null = null;
  testCategoryName: string = '';
  testComment: string | null = null;
  testQuestionGroupId: number = 0;
  testUsers: any | null = null;
  thumbnail: string | null = null;
  totalFiltered: number = 0;
  totalPoint: number | null = null;
  totalPointPass: number = 0;
  totalViewed: number = 0;
  videoUrl: string | null = null;
  courseScheduleId: string = '';
}
