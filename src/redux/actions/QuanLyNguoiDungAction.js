import { ACCESS_TOKEN, http, USER_LOGIN } from '../../util/setting';
import { history } from '../../App';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { LAY_THONG_TIN_NGUOI_DUNG } from '../types/QuanLyNguoiDungType';



export const dangKyAsyncAction = (values) => {
    return (dispatch) => {
        let promise = http.post(`/api/QuanLyNguoiDung/DangKy`,values);
        promise.then(result => {
            console.log('result', result.data);
            alert('Đăng ký thành công')
            history.push('/signin');          
        })
        promise.catch(error => {
            console.log('error', {error})
        })
    }
}

export const dangNhapAction = (values) => {
    return async (dispatch) => {

        try {
            const result = await http.post('/api/QuanLyNguoiDung/DangNhap', values);

            console.log('result', result.data); 
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
            console.log({error})
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layLichSuDatVe();
            console.log('result',result.data);
            if(result.data.statusCode === 200) {
                dispatch({
                    type: LAY_THONG_TIN_NGUOI_DUNG,
                    payload: result.data.content
                })
            }
        } catch(error) {
            console.log('error', error.response?.data)
        }
    }
}