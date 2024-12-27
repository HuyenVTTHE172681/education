export const API_URL = {
    URL_API_CORE: 'https://hhq.runasp.net/api',
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
    DUNG_HOAT_DONG: 'Dừng hoạt động'
    
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
        INVALID_DATA: 'Vui lòng xử lý dữ liệu đầu vào hợp lệ'
    },
    SUMMARY: {
        SUMMARY_DELETE_SUCCESSFUL: 'Xóa danh mục thành công',
        SUMMARY_CANCEL_DELETE: 'Hủy xóa danh mục',
        SUMMARY_UPDATE_SUCCESSFUL: 'Cập nhật danh mục thành công',
        SUMMARY_UPDATE_FAIL: 'Cập nhật danh mục thất bại',
        SUMMARY_DELETE_FALL: 'Xóa danh mục thất bại',
        SUMMARY_ADD_SUCCESSFUL: 'Thêm danh mục thành công',
        SUMMARY_ADD_FAIL: 'Thêm danh mục thất bại',
        SUMMARY_INVALID_DATA: 'Vui lòng xử lý dữ liệu đầu vào hợp lệ'
    },
    CONFIRM: {
        DELETE_CLASSROOM: 'Bạn có chắc chắn muốn xóa lớp học này không ?',
        DELETE_SUBJECT: 'Bạn có chắc chắn muốn xóa môn học này không ?'
    }
}

export const PERMISSION_KEYS = {
    ADD: 'AC_ADD',
    EDIT: 'AC_EDIT',
    DELETE: 'AC_REMOVE',
    VIEW: 'AC_VIEW',
};