import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarouselAction } from '../../../../redux/actions/CarouselActione';
// import "./HomeCarousel.css";
import Slider from "react-slick";


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000
  };

export default function HomeCarousel(props) {

    const dispatch = useDispatch();

    const {arrImg} = useSelector(state => state.CarouselReducer)
    console.log('arrImg',arrImg)

    useEffect(()=>{
        dispatch(CarouselAction())
    },[])

    return (
        <div className="carousel">
            <Slider {...settings}>
                {arrImg.map((banner,index)=>{
                    return <div key={index}>
                        <div className="carousel__img" style={{backgroundImage: `url(${banner.hinhAnh})`}}>
                            <img src={banner.hinhAnh} className="opacity-0" alt={banner.hinhAnh} />
                        </div>
                    </div>
                })}
            </Slider>
        </div>
    )
}
