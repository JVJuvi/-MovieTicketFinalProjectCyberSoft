import { USER_LOGIN } from '../../util/setting';
import { LAY_THONG_TIN_NGUOI_DUNG } from '../types/QuanLyNguoiDungType';

let usLogin = null;

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: usLogin,
    thongTinNguoiDung: {}
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
        default: return {...state}
    }
}

export default QuanLyNguoiDungReducer;