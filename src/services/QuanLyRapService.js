import { baseService } from "./baseService";
import { GROUP_ID } from '../util/setting';



export class QuanLyRapService extends baseService {
    constructor() {
        super();
    }

    layDanhSachRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    }
    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () => {
        return this.get('/api/QuanLyRap/LayThongTinHeThongRap');
    }
    layThongTinCumRapTheoHeThong = (maCumRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maCumRap}`)
    }
}


export const quanLyRapService = new QuanLyRapService();
