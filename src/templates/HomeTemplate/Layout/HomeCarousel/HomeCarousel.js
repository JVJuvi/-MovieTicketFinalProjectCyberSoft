import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CarouselAction } from '../../../../redux/actions/CarouselActione';
import "./HomeCarousel.css"

const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
};

export default function HomeCarousel(props) {

    const dispatch = useDispatch();

    const {arrImg} = useSelector(state => state.CarouselReducer)
    console.log('arrImg',arrImg)

    useEffect(()=>{
        dispatch(CarouselAction())
    },[])

    return (
        <div>
            <Carousel effect="fade" style={{width:'100%',padding:0,margin:0}}>
                {arrImg.map((item,index)=>{
                    return (
                        <div key={index}>
                            <div style={{...contentStyle, backgroundImage: `url(${item.hinhAnh})`}}>
                                <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}
