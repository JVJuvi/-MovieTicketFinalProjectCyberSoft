import React, { Fragment, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@tsamantanis/react-glassmorphism';
import Languages from './Languages';
import { Select } from "antd";
import _ from 'lodash';
import './Header.css';

// hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { TOKEN_CYBERSOFT, USER_LOGIN } from '../../../../util/setting';


const { Option } = Select;


export default function Header() {

     // lấy thông tin đăng nhập
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)

    const { t, i18n } = useTranslation();


    // dịch ngôn ngữ
    const handleChange = (value) => {      
        i18n.changeLanguage(value)
    }


    // đăng nhập xong sẽ hiển thị tên ngừoi dùng
    const renderLogin = () => {
        //dùng lodash
        if(_.isEmpty(userLogin)) {
            return <Fragment>
                        <button style={{background: '#e5a24b'}} className="self-center px-8 py-3 rounded text-white mr-3" onClick={()=>{
                                history.push('/login')
                        }}>Đăng nhập</button>                                                
                        <button style={{background: '#af731b'}} className="self-center px-8 py-3 rounded text-white"  onClick={()=>{
                                history.push('/register')
                        }}>Đăng ký</button>
            </Fragment>
        }

        return <Fragment> 
            <button onClick={()=>{
                    history.push('/profile')
                }} className="text-white">{t('Hello')} <span className="text-green-400" style={{fontSize: '20px', cursor: 'pointer'}}>{userLogin.hoTen}</span> 
            </button>
            <button className="text-blue-800 pl-5 transition duration-300 ease-in-out hover:text-blue-200" onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
                }}>Đăng xuất
            </button>
        </Fragment>

    }

    return (
        <header className="p-4 header">
            <div className="container flex justify-between items-center mx-auto">
                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2" style={{marginBottom: '11px'}}>
                    <img className="w-full" src='./imageFilm/logo.svg' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex text-white items-center px-4 -mb-1 transition duration-500 ease-in-out hover:text-yellow-300 ">Home</NavLink>
                    </li>
                    <li className="flex">
                        <a href="#lichChieu" className="flex text-white items-center px-4 -mb-1 border-b-2 border-transparent transition duration-500 ease-in-out hover:text-yellow-300">lịch chiếu</a>
                    </li>
                    <li className="flex">
                        <a href="#cumRap" className="group text-white flex items-center px-4 -mb-1 border-b-2 border-transparent transition duration-500 ease-in-out hover:text-yellow-300">Cụm rạp</a>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}
