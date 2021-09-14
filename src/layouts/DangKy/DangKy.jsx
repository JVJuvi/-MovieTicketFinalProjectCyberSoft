import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangKyAsyncAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function DangKy() {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            soDT: '',
            email: '',
            maNhom: GROUP_ID
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(dangKyAsyncAction(values))
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Không được để trống'),
            matKhau: Yup.string().required('Không được để trống'),
            hoTen: Yup.string().required('Không được để trống'),
            soDT: Yup.string().required('Không được để trống'),
            email: Yup.string().required('Không được để trống').email("Sai định dạng"),
        })
    })

    return (
        <div>
            <h1 className="text-center mb-5 text-4xl">Đăng ký</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <p>Tài khoản</p>    
                    <input style={{width: '350px'}} className="form-control" type="text" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null}
                </div>  
                <div className="form-group">
                    <p>Mật khẩu</p>    
                    <input style={{width: '350px'}} className="form-control" type="text" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null}
                </div>
                <div className="form-group">
                    <p>Họ tên</p>    
                    <input style={{width: '350px'}} className="form-control" type="text" name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.hoTen && formik.touched.hoTen ? (<div className="alert alert-danger">{formik.errors.hoTen}</div>) : null}
                </div>
                <div className="form-group">
                    <p>Số điện thoại</p>    
                    <input style={{width: '350px'}} className="form-control" type="text" name="soDT" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.soDT && formik.touched.soDT ? (<div className="alert alert-danger">{formik.errors.soDT}</div>) : null}
                </div>
                <div className="form-group">
                    <p>Email</p>    
                    <input style={{width: '350px'}} className="form-control" type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger">{formik.errors.email}</div>) : null}
                </div>   
                <div className="form-group">
                    <button type="submit" className="btn btn-info">Đăng ký</button>
                </div>     
            </form>
        </div>
    )
}
