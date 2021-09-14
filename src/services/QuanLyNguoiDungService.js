import { baseService } from './baseService';

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super()
    }
    layLichSuDatVe = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();