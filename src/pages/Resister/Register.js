import React from 'react';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangKyNguoiDungAction, dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../App';
// import './Register.css'
import { message } from 'antd';

export default function Register(props) {

    const dispatch = useDispatch()

    const formik = useFormik({
       initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maNhom: GROUP_ID
       },
       onSubmit: (values) => {
           console.log('values', values)
           dispatch(dangKyNguoiDungAction(values))
       },
       validationSchema: Yup.object({
           taiKhoan: Yup.string().required("Không được để trống").min(6, 'Tối thiểu 6 ký tự'),
           matKhau: Yup.string().required("Không được để trống").min(6, 'Tối thiểu 6 ký tự'),
           hoTen: Yup.string().required("Không được để trống"),
           soDt: Yup.string().matches(/^[0-9]+$/, 'Không đúng định dạng').min(6, 'Số điện thoại tối thiểu 10 số').required("Không được để trống"),
           email: Yup.string().required("Không được để trống").email('Không đúng định dạng'),
       })

    })


    return (
        <div className="register">
            <div className="register__close" onClick={()=>{
                history.push('/home');
            }}>
                <i class='bx bx-x'></i>
            </div>
            <div className="register__logo">
                <img src="./imageFilm/logo.svg" />          
            </div>
            <h2>Đăng ký tài khoản</h2>
            <div className="register__menu__form__input">
            <form onSubmit={formik.handleSubmit} className="register__menu__form">
                <div className="register__menu__form__input">
                    <p>Tài khoản</p>
                    <input type placeholder="Nhập tài khoản" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}/
                    > 
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="register__menu__form__input__error">{formik.errors.taiKhoan}</div>) : null}              
                </div>
                <div className="register__menu__form__input">
                    <p>Mật khẩu</p>
                    <input type="password" placeholder="Nhập mật khẩu" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="register__menu__form__input__error">{formik.errors.matKhau}</div>) : null}
                </div>
                <div className="register__menu__form__input">
                    <p>Họ và tên</p>
                    <input placeholder="nhập họ và tên" name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.hoTen && formik.touched.hoTen ? (<div className="register__menu__form__input__error">{formik.errors.hoTen}</div>) : null}
                </div>
                <div className="register__menu__form__input">
                    <p>Số điện thoại</p>
                    <input placeholder="nhập số điện thoại" name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.soDt && formik.touched.soDt ? (<div className="register__menu__form__input__error">{formik.errors.soDt}</div>) : null}
                </div>
                <div className="register__menu__form__input">
                    <p>Email</p>
                    <input placeholder="Nhập email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email ? (<div className="register__menu__form__input__error">{formik.errors.email}</div>) : null}
                </div>
                <div className="register__menu__form__button">
                    <button type="submit">Đăng ký</button>
                </div>                                             
            </form>
            </div>
        </div>
            
    )
}

