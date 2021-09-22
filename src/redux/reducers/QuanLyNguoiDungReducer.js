import { USER_LOGIN } from '../../util/setting';
import { LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG_ADMIN } from '../types/QuanLyNguoiDungType';

let usLogin = null;

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: usLogin,
    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
    thongTinNguoiDungAdmin: {}
}

const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'ADD_USER': {
            state.userLogin = action.payload
            console.log('user', state.userLogin)
            return {...state}
        }
        case LAY_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.payload;
            return {...state};
        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            let danhSachNguoiDungnew = action.payload
            let danhSachNguoiDungnewThemSTT = danhSachNguoiDungnew.map((ds,index)=>{
                return {...ds, stt: index+1} 
            })
            state.danhSachNguoiDung = danhSachNguoiDungnewThemSTT;
            return {...state};
        }
        case LAY_THONG_TIN_NGUOI_DUNG_ADMIN: {
            state.thongTinNguoiDungAdmin = action.payload;
            return {...state}
        }
        default: return {...state}
    }
}

export default QuanLyNguoiDungReducer;