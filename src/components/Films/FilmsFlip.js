import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';




export default function FilmsFlip(props) {

    const dispatch = useDispatch();

    const {item} = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <img className="flip-card-inner__img" src={item.hinhAnh} alt="Avatar"/>
                <div className="flip-card-inner-div">
                    <button onClick={()=>{
                        dispatch({
                            type: 'SHOW_MODAL',
                            payload: true,
                            item: item,
                        })
                    }}>
                        <i class='bx bx-play'></i>    
                    </button>
                </div>
                <div className="flip-bottom">
                    <Link to={`/detail/${item.maPhim}`}>
                        <span>C18</span>
                        {item.tenPhim}
                    </Link>
                </div>
            </div>
        </div>
    )
}
