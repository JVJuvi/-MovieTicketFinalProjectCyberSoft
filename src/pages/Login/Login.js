import React from 'react';
import { useFormik } from 'formik';
import { GROUP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
// import './Login.css';
import { history } from '../../App';

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
        <div className="login">
            <div className="login__close" onClick={()=>{
                history.push('/home');
            }}>
                <i class='bx bx-x'></i>
            </div>
            <div className="login__logo">
                <img src="./imageFilm/logo.svg" />          
            </div>
            <h2>Đăng nhập</h2>
            <div className="login__menu__form__input">
                <form onSubmit={formik.handleSubmit} className="login__menu__form">
                    <div className="login__menu__form__input">
                        <p>User name</p>     
                        <input type placeholder="Enter your user name" name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur}/>   
                        {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="login__menu__form__input__error">{formik.errors.taiKhoan}</div>) : null}   
                    </div>
                    <div className="login__menu__form__input">
                        <p>Password</p>  
                        <input type="password" placeholder="Enter your password" name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.matKhau && formik.touched.matKhau ? (<div className="login__menu__form__input__error">{formik.errors.matKhau}</div>) : null}
                    </div>
                    <div className="login__menu__form__button">
                        <button type="submit">Đăng nhập</button>
                    </div>
                </form>
                <div className="login__menu__signUp">
                    Don't have an account ? <a onClick={()=>{
                        history.push('/register')
                    }}>Sign up</a>
                </div>             
            </div>         
        </div>           
    )
}
