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

    const { t, i18n } = useTranslation();


    // dịch ngôn ngữ
    const handleChange =(value) => {
        
        i18n.changeLanguage(value)
    }


    // đăng nhập xong sẽ hiển thị tên ngừoi dùng
    const renderLogin = () => {
        //dùng lodash
        if(_.isEmpty(userLogin)) {
            return <Fragment>
                        <button className="self-center px-8 py-3 rounded text-white" onClick={()=>{
                                history.push('/login')
                        }}>{t("Sign in")}</button>                                                
                        <button className="self-center px-8 py-3 rounded bg-violet-600 text-coolGray-50 text-white"  onClick={()=>{
                                history.push('/register')
                        }}>{t("Sign up")}</button>
            </Fragment>
        }

        return <Fragment> 
            <button onClick={()=>{
                    history.push('/profile')
                }} className="text-white">{t('Hello')} <span className="text-green-400" style={{fontSize: '20px', cursor: 'pointer'}}>{userLogin.hoTen}</span> 
            </button>
            <button className="text-blue-800 transition duration-300 ease-in-out hover:text-blue-200" onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
                }}>Đăng xuất
            </button>
        </Fragment>
    }


    // lấy thông tin đăng nhập
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)



    return (
        <header className=" bg-coolGray-100 text-coolGray-800 bg-opacity-40 fixed w-full z-10 header">
            <div className="flex justify-between items-center container">
                <div className="flex">
                    <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                        <img style={{width: '50px'}} src='https://tix.vn/app/assets/img/icons/web-logo.png' />
                    </NavLink>             
                    <ul className="items-stretch hidden space-x-3 lg:flex">
                        <li className="flex">
                            <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("Home")}</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("Contact")}</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/new" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("News")}</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className=" flex-shrink-0 hidden lg:flex">
                        <div>
                            {renderLogin()}
                        </div>
                        <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange}>
                            <Option value="chi" label="China">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">
                                        🇨🇳
                                        </span>
                                        <span className="ml-1">CHI</span> 
                                    </div>
                                </Option>
                                <Option value="en" label="USA">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="USA">
                                        🇺🇸
                                        </span>
                                        <span  className="ml-1">EN</span> 
                                    </div>
                                </Option>
                                <Option value="vi" label="Korea">
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="Korea">
                                        🇰🇷
                                        </span>
                                        <span  className="ml-1">VI</span>
                                    </div>
                                </Option>
                        </Select>                 
                    </div>
                </div>
                {/* <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img style={{width: '50px'}} src='https://tix.vn/app/assets/img/icons/web-logo.png' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("Home")}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("Contact")}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/new" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black" activeClassName="border-b-2 border-white">{t("News")}</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange}>
                        <Option value="chi" label="China">
                                <div className="demo-option-label-item">
                                    <span role="img" aria-label="China">
                                    🇨🇳
                                    </span>
                                    <span className="ml-1">CHI</span> 
                                </div>
                            </Option>
                            <Option value="en" label="USA">
                                <div className="demo-option-label-item">
                                    <span role="img" aria-label="USA">
                                    🇺🇸
                                    </span>
                                    <span  className="ml-1">EN</span> 
                                </div>
                            </Option>
                            <Option value="vi" label="Korea">
                                <div className="demo-option-label-item">
                                    <span role="img" aria-label="Korea">
                                    🇰🇷
                                    </span>
                                    <span  className="ml-1">VI</span>
                                </div>
                            </Option>
                    </Select>                 
                </div> */}
                {/* <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button> */}
            </div>
        </header>
    )
}
