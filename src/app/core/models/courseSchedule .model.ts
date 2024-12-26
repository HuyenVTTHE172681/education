import { Test } from "./test.model";

export class CourseSchedule {
  id: string = '';
  courseId: string | null = null;
  name: string = '';
  order: number = 0;
  status: number = 0;
  createdBy: string | null = null;
  createdDate: string | null = null;
  modifiedBy: string | null = null;
  modifiedDate: string | null = null;
  testUsers: any = null; // You can define a type for test users if needed
  tests: Test[] = []; // Array of associated tests
}
