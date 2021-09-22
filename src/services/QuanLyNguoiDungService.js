import { GROUP_ID } from '../util/setting';
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
    layDanhSachNguoiDung = (taiKhoan='') => {
        if(taiKhoan.trim() != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
    }
    layThongTinNguoiDung = (taiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
    }
    timKiemNguoiDung = (taiKhoan) => {
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`)
    }
    themNguoiDung = (values) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, values)
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();