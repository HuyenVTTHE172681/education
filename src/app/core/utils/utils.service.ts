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
}
