import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { http } from "../../util/setting";
import { LAY_DANH_SACH_PHIM } from '../types/QuanLyPhimType';




export const LayDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim();
            console.log('layPhim', result.data)
            dispatch({
                type: LAY_DANH_SACH_PHIM,
                payload: result.data.content
            })

        } catch(error) {
            console.log('error', error.response?.data)
        }
    }
}