import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { DAT_VE, DAT_VE_HOAN_TAT, LAY_CHI_TIET_DAT_VE } from '../types/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { http } from "../../util/setting";
import { DISPPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";
import { connection } from "../../index";



export const layChiTietPhongVeAcTion = (maLichChieu) => {
    return async(dispatch) => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
            console.log('result', result.data);
            if(result.status === 200) {
                dispatch({
                    type: LAY_CHI_TIET_DAT_VE,
                    payload: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async(dispatch, getState) => {
        try {
            dispatch({
                type: DISPPLAY_LOADING
            })

            const result = await quanLyDatVeService.datVe(thongTinDatVe)
            // const result = await http.post('/api/QuanLyDatVe/DatVe', thongTinDatVe)
            console.log('result', result.data.content)
            // sau khi đặt vé thành công api load lại phòng vé
            await dispatch(layChiTietPhongVeAcTion(thongTinDatVe.maLichChieu))
            await dispatch({type: DAT_VE_HOAN_TAT})
            await dispatch({type: HIDE_LOADING})    

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke("datGheThanhCong", userLogin.taiKhoan, thongTinDatVe.maLichChieu)

            dispatch({type: 'CHUYEN_TAB',})
            
            
        } catch (error) {
            dispatch({type: HIDE_LOADING})
            console.log('error', error.response.data)
        }
    }
}

export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => { // không thể lấy state từ file này file action vì ko có useSelector tuy nhiên redux thunk ngoài tham sô dispatch nó còn getState để có thể lấy dự liệu 
        //đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            payload: ghe
        })

        //call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        
        console.log('danhSachGheDangDat',danhSachGheDangDat);
        console.log('taiKhoan',taiKhoan);
        console.log('maLichChieu',maLichChieu);
        //biến mảng thành chuổi trước khi vỏ vào invoke
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //call spi signalR
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);

    }
}

