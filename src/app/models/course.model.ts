import { ClassRoom } from './classRoom.model';
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';

export class Course {
  id: string = '';
  name: string = '';
  code: string = '';
  courseAvatar: string = ''; // Đường dẫn hình ảnh đại diện
  courseBanner: string = ''; // Đường dẫn hình ảnh banner
  courseInfo1: string = ''; // Thông tin thêm khóa học
  courseInfo2: string = ''; // Thông tin thêm khóa học
  courseThumbnail: string = ''; // Ảnh thu nhỏ (thumbnail)
  averageRating: number = 0; // Đánh giá trung bình
  totalRating: number = 0; // Tổng số lượt đánh giá
  totalStudent: number = 0; // Tổng số học viên
  price: number = 0; // Giá khóa học
  priceDiscount: number = 0; // Giá giảm
  promotionTime: string = ''; // Thời gian khuyến mãi
  createdDate: string = ''; // Ngày tạo
  createdBy: string = ''; // Người tạo
  modifiedDate: string = ''; // Ngày chỉnh sửa
  modifiedBy: string = ''; // Người chỉnh sửa
  shortSummary: string = ''; // Tóm tắt ngắn gọn
  isShowHome: number = 0; // Trạng thái hiển thị trên trang chủ (1: Có, 0: Không)
  isPassCourse: boolean = false; // Trạng thái đã vượt qua khóa học

  // Thông tin lớp học
  classRoom: ClassRoom[] = [];
  classRoomId: string = ''; // ID lớp học
  classRoomName: string | null = null; // Tên lớp học

  // Thông tin giáo viên
  teacher: Teacher[] = []; // Danh sách giáo viên
  teacherId: string | null = null; // ID giáo viên chính (nếu có)
  teacherName: string | null = null; // Tên giáo viên chính (nếu có)

  studentNum: number = 0; // Số lượng học viên hiện tại
  status: number = 1; // Trạng thái khóa học (1: Đang hoạt động)

  courseYears: CourseYear[] = [];
  courseYearId: string | null = null;
  courseYearName: string | null = null;

  subject: Subject[] = [];
  subjectId: string = '';
  subjectName: string | null = null; // Có thể null
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
