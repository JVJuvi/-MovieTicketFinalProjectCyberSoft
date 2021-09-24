import { AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import './Footer.css';
import { NavLink } from 'react-router-dom';

export default function Footer() {

    const{arrLogoRap} = useSelector(state => state.QuanLyRapReducer);
    console.log('arrlogo', arrLogoRap)

    return (
        <footer className="footer mt-20">
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className="grid grid-cols-12">
                    <div className="pb-6 col-span-5 md:pb-0 ">
                        <a href="#" className="flex justify-center space-x-3 md:justify-start">
                            <img src="./imageFilm/logo.svg" alt="banner" />
                        </a>
                    </div>
                    <div className="col-span-3 md:text-left ">
                        <p className="text-sm text-white">Đối tác</p>
                        <div className="grid grid-cols-3">
                            {arrLogoRap.map((item,index)=>{
                                return (
                                    <div key={index} className="my-3">
                                        <img src={item.logo} alt="..." width={50} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-span-2 ml-10 md:text-left">
                        <p className="text-sm text-white mb-5">MOBILE APP</p>
                        <div className="flex text-white">
                            <div className="mr-5" style={{width: '30px', height: '30px'}}>
                                <img src="./imageFilm/apple-logo.png" />
                            </div>
                            <div style={{width: '30px', height: '30px'}}>
                                <img src="./imageFilm/android-logo.png" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 md:text-left">
                        <p className="text-sm text-white mb-5">SOCIAL</p>
                        <div className="flex text-white">
                            <div className="mr-5" style={{width: '30px', height: '30px'}}>
                                <img src="./imageFilm/facebook-logo.png" />
                            </div>
                            <div style={{width: '30px', height: '30px'}}>
                                <img src="./imageFilm/zalo-logo.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid justify-center pt-6 lg:justify-between">
                    <div className="flex text-white flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                        <span>©2021 All rights reserved</span>
                        <a href="#">
                            <span>Privacy policy</span>
                        </a>
                        <a href="#">
                            <span>Terms of service</span>
                        </a>
                    </div>
                    <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                        <a href="mailto:cuongc6302@gmail.com" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-coolGray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100013496980253" title="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-600 text-coolGray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-4 h-4">
                                <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                            </svg>
                        </a>
                        <a href="https://github.com/JVJuvi" className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-coolGray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
