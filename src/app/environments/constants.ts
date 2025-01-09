export const API_URL = {
    URL_API_CORE: 'https://hhq.runasp.net/api',
}

export const HttpStatus = {
    OK: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
}

export const STATUS = {
    HIEN_THI: 'Hiển thị',
    AN: 'Ẩn',
    GUI: 'Gửi',
    KHONG: 'Không',
    MIEN_PHI: 'Miễn phí',
    TRA_PHI: 'Trả phí',
    DA_THANH_TOAN: 'Đã thanh toán',
    CHO_THANH_TOAN: 'Chờ thanh toán',
    DANG_HOAT_DONG: 'Đang hoạt động',
    DUNG_HOAT_DONG: 'Dừng hoạt động',
    HOT: 'Hot',
    KHONG_HOT: 'Không Hot',
    DAT: 'Đạt',
    TRUOT: 'Loại',
    DANG_CHO: 'Đang chờ',
    PHONG_VAN: 'Phỏng vấn'
}

export const CONSTANTS = {
    MESSAGE_ALERT: {
        ADD_SUCCESSFUL: 'Thêm mới thành công',
        ADD_FAIL: 'Thêm mới thất bại',
        UPDATE_SUCCESSFUL: 'Cập nhật thành công',
        UPDATE_FAIL: 'Cập nhật thất bại',
        DELETE_SUCCESSFUL: 'Xóa thành công',
        DELETE_FAIL: 'Xóa thất bại',
        DELETE_CANCEL: 'Hủy xóa danh mục',
        INVALID_DATA: 'Vui lòng xử lý dữ liệu đầu vào hợp lệ',
        PAYMENT_NOT_DELETE: 'Thanh toán được duyệt, không thể xóa!',
        ACCEPT_PAYMENT: 'Thanh toán đã được duyệt, không thể xác nhận lại!',
        CANCEL_PAYMENT: 'Thanh toán chưa được duyệt, không thể hủy!',
        ACCEPT_PAYMENT_SUCCESSFUL: 'Thanh toán được duyệt',
        CANCEL_PAYMENT_SUCCESSFUL: 'Hủy thanh toán',
        ERROR: 'Có lỗi xảy ra. Vui lòng thử lại !',
        CHANGE_STATUS: 'Thay đổi trạng thái thành công !'
    },
    SUMMARY: {
        SUMMARY_DELETE_SUCCESSFUL: 'Xóa danh mục thành công',
        SUMMARY_CANCEL_DELETE: 'Hủy xóa danh mục',
        SUMMARY_UPDATE_SUCCESSFUL: 'Cập nhật danh mục thành công',
        SUMMARY_UPDATE_FAIL: 'Cập nhật danh mục thất bại',
        SUMMARY_DELETE_FALL: 'Xóa danh mục thất bại',
        SUMMARY_ADD_SUCCESSFUL: 'Thêm danh mục thành công',
        SUMMARY_ADD_FAIL: 'Thêm danh mục thất bại',
        SUMMARY_INVALID_DATA: 'Vui lòng xử lý dữ liệu đầu vào hợp lệ',
        SUMMARY_PAYMENT_NOT_DELETE: 'Thanh toán được duyệt, không thể xóa!',
        SUMMARY_ACCEPT_PAYMENT: 'Thanh toán được duyệt, không thể xác nhận lại!',
        SUMMARY_CANCEL_PAYMENT: 'Thanh toán chưa được duyệt, không thể hủy!',
        SUMMARY_ACCEPT_SUCCESSFUL: 'Thanh toán được duyệt',
        SUMMARY_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại !',
    },
    CONFIRM: {
        DELETE_CLASSROOM: 'Bạn có chắc chắn muốn xóa lớp học này không ?',
        DELETE_SUBJECT: 'Bạn có chắc chắn muốn xóa môn học này không ?',
        DELETE_BAI_HOC: 'Bạn có chắc chắn muốn xóa bài học này không ?',
        DELETE_TEACHER: 'Bạn có chắc chắn muốn xóa giáo viên này không ?',
        DELETE_COURSE: 'Bạn có chắc chắn muốn xóa khóa học này không ?',
        DELETE_MON_HOC: 'Bạn có chắc chắn muốn xóa môn học này không ?',
        DELETE_PAYMENT: 'Bạn có chắc chắn muốn xóa thanh toán này không ?',
        DELETE_QUESTION: 'Bạn có chắc chắn muốn xóa câu hỏi này không ?',
        CHANGE_STATUS_QUESTION: 'Bạn có muốn Trình duyệt câu hỏi này không ?',
        DELETE_QUESTION_GROUP: 'Bạn có muốn xóa nhóm câu hỏi này không ?',
        DELETE_TIN_TUYEN_DUNG: 'Bạn có muốn xóa tin tuyển dụng này không ?'
    }
}

export const PERMISSION_KEYS = {
    ADD: 'AC_ADD',
    EDIT: 'AC_EDIT',
    DELETE: 'AC_REMOVE',
    VIEW: 'AC_VIEW',
};