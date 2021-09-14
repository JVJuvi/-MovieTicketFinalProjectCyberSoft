import { baseService } from "./baseService";
import { GROUP_ID } from '../util/setting';
import { ThongTinDatVe } from '../_core/models/ThongTinDatVe';



export class QuanLyDatVeService extends baseService {
    constructor() {
        super();
    }
    
    layChiTietPhongVe = (maLichChieu) => { // mã lịch chiếu lấy từ url
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post('/api/QuanLyDatVe/DatVe', thongTinDatVe);
    }
    
}


export const quanLyDatVeService = new QuanLyDatVeService();