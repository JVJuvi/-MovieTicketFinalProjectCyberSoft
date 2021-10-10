import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalVideo from './ModalVideo';
import { useDispatch } from 'react-redux';




export default function FilmsFlip(props) {

    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     setShowModal(prev => !prev)
    // }

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
                        <img src='https://tix.vn/app/assets/img/icons/play-video.png' />    
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
