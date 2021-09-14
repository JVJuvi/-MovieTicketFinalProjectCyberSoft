
import { quanLyRapService } from '../../services/QuanLyRapService';
import { LAY_CHI_TIET_PHIM, LAY_THONG_TIN_CUM_RAP } from '../types/QuanLyRapType';


export const layDanhSachCumRapAction = () => {
    return async(dispatch) => {
        try {
            const result = await quanLyRapService.layDanhSachRap()
            console.log('result', result.data)
            if(result.status === 200) {
                dispatch({
                    type: LAY_THONG_TIN_CUM_RAP,
                    payload: result.data.content
                })
            }
        }catch (errors) {
            console.log('error', errors.response?.data)
        }
    }
}

export const layChiTietPhimAction = (id) => {
    return async(dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(id)
            console.log('result',result.data);
            dispatch({
                type: LAY_CHI_TIET_PHIM,
                payload: result.data.content
            })
        } catch(error) {
            console.log('error',error.response?.data)
        }
    }
}