import { ACCESS_TOKEN, http, USER_LOGIN } from '../../util/setting';
import { history } from '../../App';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG_ADMIN } from '../types/QuanLyNguoiDungType';
import { DISPPLAY_LOADING, HIDE_LOADING } from '../types/LoadingType';



export const dangKyNguoiDungAction = (values) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKyNguoiDung(values);
            await alert("Đăng ký thành công")
            await history.goBack();
        } catch(error) {
            console.log('error', error.response?.data);
            // alert("Đăng ký không thành công vui lòng đăng ký lại")
            alert(error.response?.data.content)
        }
    }
}



export const dangNhapAction = (values) => {
    return async (dispatch) => {

        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', values);; 
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken);
            const sUserLogin = JSON.stringify(result.data.content)
            localStorage.setItem(USER_LOGIN, sUserLogin)    
            
            if(result.data.statusCode === 200) {
                dispatch({
                    type: 'ADD_USER',
                    payload: result.data.content
                })
                //chuyển hướng về trang trước đó
                history.goBack();
            }
        } catch (error) {
            console.log('error', error.response?.data);
            alert(error.response?.data.content)
        }
    }
}

export const layThongTinNguoiDungDanNhapAction = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DISPPLAY_LOADING
            })
            const result = await quanLyNguoiDungService.layLichSuDatVe();
            console.log('result',result.data);
            await dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG,
                payload: result.data.content
            })
            dispatch({type: HIDE_LOADING})  
        } catch(error) {
            dispatch({type: HIDE_LOADING}) 
            console.log('error', error.response?.data)
        }
    }
}

export const layDanhSachNguoiDungAction = (taiKhoan) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(taiKhoan);
            dispatch({
                type: LAY_DANH_SACH_NGUOI_DUNG,
                payload: result.data.content
            })

        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const layThongTinNguoiDungAction = (taiKhoan) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung(taiKhoan)
            dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG_ADMIN,
                payload: result.data.content
            })
        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const capNhatThongTinNguoiDungAction = (formData) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formData);
            alert("Cập nhật thành công")
            await dispatch(layDanhSachNguoiDungAction());
            history.push('/admin/users');
        } catch(errors) {
            console.log('errors', errors.response?.data);
            // alert("Đăng ký không thành công vui lòng đăng ký lại")
            alert(errors.response?.data.content)
        }
    }
}

export const timKiemNguoiDungAction = (taiKhoan) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.timKiemNguoiDung(taiKhoan)
            dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG_ADMIN,
                payload: result.data.content
            })
        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const themNguoiDungAction = (values) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(values);
            alert("Thêm thành công")
            await dispatch(layDanhSachNguoiDungAction())
            history.push('/admin/users');
        } catch(errors) {
            console.log('errors', errors.response?.data)
            alert(errors.response?.data.content);
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async(dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);;
            alert("Xoá thành công")
            dispatch(layDanhSachNguoiDungAction());
        } catch(errors) {
            console.log('errors', errors.response?.data)
            alert(errors.response?.data.content);
        }
    }
}
