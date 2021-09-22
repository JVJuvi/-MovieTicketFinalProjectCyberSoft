import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { LAY_CHI_TIET_PHIM, LAY_CHI_TIET_PHIM_ADMIN, LAY_DANH_SACH_PHIM } from '../types/QuanLyPhimType';




export const LayDanhSachPhimAction = (tenPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            console.log('layPhim', result.data)
            console.log('tenPhim', tenPhim)
            dispatch({
                type: LAY_DANH_SACH_PHIM,
                payload: result.data.content
            })

        } catch(error) {
            console.log('error', error.response?.data)
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async(dispatch) => {
        try {
            const result = await quanLyPhimService.layPhimUploadHinh(formData);
            console.log('result', result.data.content)
            alert('Thêm phim thành công')
        } catch(errors) {
            console.log(errors.response?.data)
        }
    }
}

export const layChiTietPhimAction = (maPhim) => {
    return async(dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim)
            console.log('result', result.data);
            await dispatch({
                type: LAY_CHI_TIET_PHIM_ADMIN,
                payload: result.data.content
            })
        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async(dispatch) => {
        try {
            const result = await quanLyPhimService.CapNhatPhimUpload(formData)
            alert('Cập nhật thành công')
            console.log('result', result.data)
            // sau khi cập nhật xong phải load lại trang film thì mới thấy cập nhật không thì chỉ có trên api thôi
            dispatch(LayDanhSachPhimAction());
            // chuyển về trang films sau khi cập nhật
            history.push('/admin/films')
        } catch (errors) {
            console.log('errors', errors.response?.data);
        }
    }
}
export const xoaPhimAction = (maPhim) => {
    return async(dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim)
            console.log('result', result.data)
            alert('Đã xoá thành công')
            dispatch(LayDanhSachPhimAction())
        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    }
}
