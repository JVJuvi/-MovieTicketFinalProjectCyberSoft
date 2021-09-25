import React, { useState } from 'react';
import './FilmsFlip.css';
import { NavLink } from 'react-router-dom';
import ModalVideo from './ModalVideo';
import { history } from '../../App';
import { Rate } from 'antd';




export default function FilmsFlip(props) {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev)
      }

    const {item} = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <img className="w-full" src={item.hinhAnh} alt="Avatar" style={{height: 400}} />
                <div className="flip-card-inner-div">
                    <button className="rounder-full z-50 cursor-pointer transition duration-300 ease-in-out hover:opacity-75" onClick={openModal}>
                        <img src='https://tix.vn/app/assets/img/icons/play-video.png' />    
                    </button>
                    <ModalVideo item={item} showModal={showModal} setShowModal={setShowModal} />
                </div>
            </div>
            <div className="flip-bottom">
                <NavLink to={`/detail/${item.maPhim}`}>
                    <span className="text-white bg-red-500 rounded-md mr-1" style={{padding: '2px 10px'}}>C18</span>
                    <span className="text-lg font-bold text-black">{item.tenPhim}</span>
                </NavLink>
            </div>
        </div>
    )
}
