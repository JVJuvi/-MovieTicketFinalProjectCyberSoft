import React from 'react';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import './Login.css';

export default function Login(props) {

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
        <div className="login xl:max-w-screen-sm">
            <div className="flex justify-center items-center">
                <img src="./imageFilm/logo.svg" />          
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold xl:text-5xl
                        xl:text-bold">Log in</h2>
                <div className="mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide flex">User name</div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Enter your user name" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">
                                Password
                            </div>
                            <div>
                                <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                                cursor-pointer">
                                Forgot Password?
                                </a>
                            </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null}
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                        shadow-lg">
                            Log In
                            </button>
                        </div>
                    </form>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    Don't have an account ? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</a>
                    </div>
                </div>
            </div>
        </div>           
    )
}
