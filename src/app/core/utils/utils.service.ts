import { Injectable } from '@angular/core';
import { STATUS } from '../../environments/constants';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constructor() { }

    getStatusLabel(status: number) {
        return status === 1 ? STATUS.HIEN_THI : STATUS.AN;
    }

    getStatusClass(status: number) {
        switch (status) {
            case 1:
                return 'primary';
            case 0:
                return 'danger';
            default:
                return 'warning';
        }
    }

    getStatusBooleanClass(status: boolean) {
        return status ? 'primary' : 'danger';
    }

    getFreeLabel(status: number) {
        return status === 1 ? STATUS.MIEN_PHI : STATUS.TRA_PHI;
    }

    getFreeClass(status: number) {
        switch (status) {
            case 1:
                return 'primary';
            case 0:
                return 'warning';

            case 2:
                return 'success';

            default:
                return 'danger';
        }
    }

    getEmailLabel(status: number): string {
        return status === 1 ? STATUS.GUI : STATUS.KHONG;
    }

    getPublicStatusLabel(status: number) {
        switch (status) {
            case 0:
                return 'Mới tạo';

            case 1:
                return 'Chờ duyệt';

            case 2:
                return 'Công khai';

            default:
                return '---';
        }
    }

    getPublicStatusClass(status: number) {
        switch (status) {
            case 0:
                return 'primary';
            case 1:
                return 'warning';

            case 2:
                return 'success';

            default:
                return 'danger';
        }
    }

    getCourseFreeLabel(status: number) {
        return status === 1 ? 'isFree' : 'notFree';
    }

    getIconsStatus(status: number): string {
        return status === 1 ? 'pi pi-check' : 'pi pi-times';
    }

    getIconsStatusBoolean(status: boolean): string {
        return status ? 'pi pi-check' : 'pi pi-times';
    }

    getPaymentLabel(isPayment: number) {
        return isPayment === 1 ? STATUS.DA_THANH_TOAN : STATUS.CHO_THANH_TOAN;
    }

    getStatusOnlineLabel(status: number) {
        return status === 1 ? STATUS.DANG_HOAT_DONG : STATUS.DUNG_HOAT_DONG;
    }
}
