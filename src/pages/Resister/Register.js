import React from 'react';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangKyNguoiDungAction, dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import './Register.css'

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
           taiKhoan: Yup.string().required("Không được để trống"),
           matKhau: Yup.string().required("Không được để trống"),
           hoTen: Yup.string().required("Không được để trống"),
           soDt: Yup.string().required("Không được để trống"),
           email: Yup.string().required("Không được để trống"),
       })

    })


    return (
        <div className="register xl:max-w-screen-sm">
            <div className="flex justify-center items-center">
                <img src="./imageFilm/logo.svg" />          
            </div>
            <div className=" px-12 sm:px-24 md:px-48 lg:px-12 xl:px-5 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold xl:text-5xl
                    xl:text-bold">Đăng ký tài khoản</h2>
            <div>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-x-3">
                    <div className="col-span-1">
                        <div className="flex text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Nhập tài khoản" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}/
                        > 
                        {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null}              
                    </div>
                    <div className="col-span-1">
                        <div className="flex text-sm font-bold text-gray-700 tracking-wide">Mật khẩu</div>
                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Nhập mật khẩu" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null}
                    </div>
                    <div className="col-span-1">
                        <div className="flex text-sm font-bold text-gray-700 tracking-wide">Họ và tên</div>
                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="nhập họ và tên" name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.hoTen && formik.touched.hoTen ? (<div className="alert alert-danger">{formik.errors.hoTen}</div>) : null}
                    </div>
                    <div className="col-span-1">
                        <div className="flex text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="nhập số điện thoại" name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.soDt && formik.touched.soDt ? (<div className="alert alert-danger">{formik.errors.soDt}</div>) : null}
                    </div>
                    <div className="mt-8 col-span-2">
                        <div className="flex text-sm font-bold text-gray-700 tracking-wide">Email</div>
                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger">{formik.errors.email}</div>) : null}
                    </div>
                    <div className="mt-10 col-span-2">
                        <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                    shadow-lg">
                        Đăng ký
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
            
    )
}

