import React, { Fragment, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { useSelector } from 'react-redux';
import { Select } from "antd";
import _ from 'lodash';
import { TOKEN_CYBERSOFT, USER_LOGIN } from '../../../../util/setting';
// hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';



const { Option } = Select;


export default function Header() {

    const headerRef = useRef(null)

    // useEffect(()=>{
    //     window.addEventListener("scroll", () => {
    //         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    //             headerRef.current.classList.add("shrink");
    //         } else {
    //             headerRef.current.classList.remove("shrink");
    //         }
    //     })
    //     return () => {
    //         window.removeEventListener("scroll")
    //     };
    // },[]);

     // lấy thông tin đăng nhập
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)

    const { t, i18n } = useTranslation();


    // dịch ngôn ngữ
    const handleChange = (value) => {      
        i18n.changeLanguage(value)
    };

    // let i18 = '';
    // if(localStorage.getItem('i18nextLng')) {
    //     i18 = JSON.parse(localStorage.getItem('i18nextLng'));
    // }
    // console.log('i18'. i18)

    //trang admin chỉ có quản trị viên mới có quyền truy cập nên set userLogin nếu maLoaiNguoiDung khác quản trị thì sẽ cho về home
    const renderAdmin = () => {
        if(!localStorage.getItem(USER_LOGIN)) {
            return '';
        }
        if(userLogin.maLoaiNguoiDung === "QuanTri") {
            return <div className="header__menu__item header__menu__left__item">
                    <NavLink to="/admin">Admin</NavLink>
                </div>
        }
    }



    // đăng nhập xong sẽ hiển thị tên ngừoi dùng
    const renderLogin = () => {
        //dùng lodash
        if(_.isEmpty(userLogin)) {
            return <Fragment>
                        <img className="header__menu__img" style={{width: '4rem', height: '4rem', borderRadius: '100%', marginRight: '1rem'}} src="./imageFilm/avatar.png" alt="" />
                        <p className="header__menu__item" onClick={()=>{
                                history.push('/login')
                        }}>{t('Sign in')}</p>                                                
                        {/* <p className="header__menu__item"  onClick={()=>{
                                history.push('/register')
                        }}>{t('Sign up')}</p> */}
            </Fragment>
        }

        return <Fragment> 
            <p onClick={()=>{
                    history.push('/profile')
                }} className="header__menu__item">
                   <i class='bx bxs-user' ></i> {t('Hello')} {userLogin.hoTen}!
            </p>
            <p className="header__menu__item" onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
                }}><span>{t('Log out')}</span>
            </p>
        </Fragment>

    }

    const menuRef = useRef(null);

    const menuToggle = () => menuRef.current.classList.toggle('active');

    const { Option } = Select;

    return (
        <header className="header" ref={headerRef}>
            <div className="header__height">
                <div className="header__logo">
                    <Link to="/home">
                        <img src='./imageFilm/logo.svg' />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i class='bx bx-menu'></i>
                    </div> 
                        <div className="header__menu__left" ref={menuRef}>
                            <div className="header__menu__left__close" onClick={menuToggle}>
                                <i className='bx bx-chevron-left'></i>
                            </div>
                            <div className="header__menu__left__content">
                                <div className="header__menu__item header__menu__left__item" onClick={menuToggle}>
                                    <Link to="/home">{t('Home')}</Link>
                                </div>
                                <div className="header__menu__item header__menu__left__item" onClick={menuToggle}>
                                    <a href="#lichChieu">{t('Showtimes')}</a>
                                </div>
                                <div className="header__menu__item header__menu__left__item" onClick={menuToggle}>
                                    <a href="#cumRap">{t('Theaters')}</a>
                                </div>
                                {renderAdmin()}
                            </div>
                            <div className="header__menu__left__info">
                                {renderLogin()}
                                <div className="header__menu__item" style={{textAlign: 'right', zIndex:"9999"}}>
                                    <Select defaultValue="vi" style={{ width: 41, zIndex:"9999" }} onChange={handleChange}>
                                        <Option value="vi">🇻🇳</Option>
                                        <Option value="en">🇺🇸</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </header>
    )
}
