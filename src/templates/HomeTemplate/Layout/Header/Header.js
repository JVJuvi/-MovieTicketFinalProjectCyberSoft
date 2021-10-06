import React, { Fragment, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { useSelector } from 'react-redux';
import { Select } from "antd";
import _ from 'lodash';



// hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { TOKEN_CYBERSOFT, USER_LOGIN } from '../../../../util/setting';


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

    // const { t, i18n } = useTranslation();


    // // dịch ngôn ngữ
    // const handleChange = (value) => {      
    //     i18n.changeLanguage(value)
    // }

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
                        <p className="header__menu__item" onClick={()=>{
                                history.push('/login')
                        }}>Đăng nhập</p>                                                
                        <p className="header__menu__item"  onClick={()=>{
                                history.push('/register')
                        }}>Đăng ký</p>
            </Fragment>
        }

        return <Fragment> 
            <p onClick={()=>{
                    history.push('/profile')
                }} className="header__menu__item">
                   <i class='bx bxs-user' ></i> Hello {userLogin.hoTen}!
            </p>
            <p className="header__menu__item" onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
                }}><span>Đăng xuất</span>
            </p>
        </Fragment>

    }

    const menuRef = useRef(null);

    const menuToggle = () => menuRef.current.classList.toggle('active');

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
                                    <Link to="/home">Home</Link>
                                </div>
                                <div className="header__menu__item header__menu__left__item" onClick={menuToggle}>
                                    <a href="#lichChieu">lịch chiếu</a>
                                </div>
                                <div className="header__menu__item header__menu__left__item" onClick={menuToggle}>
                                    <a href="#cumRap">Cụm rạp</a>
                                </div>
                                {renderAdmin()}
                            </div>
                            <div className="header__menu__left__info">
                                {renderLogin()}
                            </div>
                        </div>
                </div>
            </div>
        </header>
    )
}
