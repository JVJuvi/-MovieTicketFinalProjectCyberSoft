
import { DAT_VE, DAT_VE_HOAN_TAT, LAY_CHI_TIET_DAT_VE } from '../types/QuanLyDatVeType';
import { ThongTinLichChieu } from '../../_core/models/ThongTinPhongVe';


const stateDefault = {
    
    chiTietPhongVe: new ThongTinLichChieu,
      // ban đầu reducer bằng rổng nên trang checkout ko thể bóc tách lấy giá trị được ,khi api trả về thì mới có dữ liệu , nên ta phải tạo 1 lớp đối tượng để sẳn maintain code và để không bị báo lỗi
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [{maGhe: 55408},{maGhe:55409}],
    tabActive: '1',
}   

const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case LAY_CHI_TIET_DAT_VE: {
            state.chiTietPhongVe = action.payload;
            return {...state};
        }
        case DAT_VE: {
            let danhSachGheDangDatCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatCapNhat.findIndex(item => item.maGhe === action.payload.maGhe);
            if(index !== -1) {
                danhSachGheDangDatCapNhat.splice(index, 1)
            } else {
                danhSachGheDangDatCapNhat.push(action.payload);
            }
            state.danhSachGheDangDat = danhSachGheDangDatCapNhat;
            return {...state};
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return {...state};
        }
        case 'CHUYEN_TAB': {
            state.tabActive = '2';
            return {...state}
        }
        case 'CHUYEN_TAB_ACTIVE': {
            state.tabActive = action.payload;
            return {...state};
        }
        default: return{...state}
    }
}

export default QuanLyDatVeReducer;
