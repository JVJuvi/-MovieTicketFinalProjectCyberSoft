import React from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@tsamantanis/react-glassmorphism';


export default function Header() {

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)

    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-gray-600 bg-opacity-40 fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src='https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/new" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">News</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {userLogin ? (<p className="text-white">Hello bé bi <span className="text-green-400" style={{fontSize: '20px'}}>{userLogin.hoTen}</span> </p>) : 
                        <button className="self-center px-8 py-3 rounded text-white" onClick={()=>{
                            history.push('/login')
                        }}>Sign in</button>                        
                    
                        // <button className="self-center px-8 py-3 rounded bg-violet-600 text-coolGray-50 text-white">Sign up</button>
                    }                  
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
