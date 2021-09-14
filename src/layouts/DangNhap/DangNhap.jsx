import React from 'react';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../App';

export default function DangNhap(props) {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            maNhom: GROUP_ID
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(dangNhapAction(values));
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Không được để trống'),
            matKhau: Yup.string().required('Không được để trống'),
            
        })
    })

    return (
        <div className="container" style={{maxWidth: '600px', margin: '0 auto'}}>
            <h1 className="text-center mb-5 text-4xl">Đăng nhập</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p>Tài khoản</p>    
                    <input className="form-control" type="text" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null}
                </div>  
                <div className="form-group">
                    <p>Mật khẩu</p>    
                    <input className="form-control" type="password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-info">Đăng nhập</button>
                </div>     
            </form>
        </div>
    )
}
