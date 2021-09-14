
import { LAY_DANH_SACH_PHIM, LAY_PHIM_DANG_CHIEU, LAY_PHIM_SAP_CHIEU } from '../types/QuanLyPhimType';
import { LAY_CHI_TIET_PHIM } from '../types/QuanLyRapType';


const stateDefault = {
    arrPhim: [],
    dangChieu: true,
    sapChieu:true,
    arrPhimDefault: [],
    filmDetail: {},
}

const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case LAY_DANH_SACH_PHIM : {
            state.arrPhim = action.payload;
            state.arrPhimDefault = state.arrPhim;
            return {...state};
        }
        case LAY_PHIM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrPhim = state.arrPhimDefault.filter(item => item.dangChieu === state.dangChieu);
            return {...state};
        }
        case LAY_PHIM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;

            state.arrPhim = state.arrPhimDefault.filter(item => item.sapChieu === state.sapChieu);
            return {...state};
        }
        case LAY_CHI_TIET_PHIM: {
          state.filmDetail = action.payload;
          return {...state};
        }
        default: return{...state};
    }
}

export default QuanLyPhimReducer