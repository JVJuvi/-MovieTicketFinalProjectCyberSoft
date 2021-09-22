import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { http } from '../../util/setting';



export const CarouselAction = () => {
    return async(dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachBanner();
            console.log('result', result.data);

            dispatch({
                type: 'SET_CAROUSEL',
                payload: result.data.content
            })
        } catch (error){
            console.log('error', error.response?.data)
        }
    }
}