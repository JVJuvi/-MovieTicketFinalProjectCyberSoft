import { baseService } from "./baseService";
import { GROUP_ID } from '../util/setting';



export class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner');
    }
    layDanhSachPhim = (tenPhim='') => {
        if(tenPhim.trim() !='') {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`);          
        }else {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
        }
        
    }
    layPhimUploadHinh = (formtData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formtData);
    }
    layThongTinPhim = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }
    CapNhatPhimUpload = (formData) => {
        return this.post('/api/QuanLyPhim/CapNhatPhimUpload', formData);
    }
    xoaPhim = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
    
}


export const quanLyPhimService = new QuanLyPhimService();