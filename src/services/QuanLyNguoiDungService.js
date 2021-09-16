import { baseService } from './baseService';

export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super()
    }
    dangKyNguoiDung = (values) => {
        return this.post('/api/QuanLyNguoiDung/DangKy', values)
    }
    layLichSuDatVe = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();