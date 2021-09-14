import { baseService } from "./baseService";
import { GROUP_ID } from '../util/setting';



export class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner');
    }

    layDanhSachPhim = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
}


export const quanLyPhimService = new QuanLyPhimService();