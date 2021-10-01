import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
// import styleSlick from "./MultipleRowSlick.module.css"
import FilmsFlip from "../Films/FilmsFlip";
import { LAY_PHIM_DANG_CHIEU, LAY_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { useDispatch, useSelector } from 'react-redux';



const MultipRowSlick = (props) => {

    const {arrPhim} = props;
    const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);

    console.log('dang chieu', dangChieu)
    console.log('sapChieu', sapChieu)
    
    const dispatch = useDispatch();
    const renderPhim = () => {
        return arrPhim.slice(0,12).map((item,index)=>{
            return (
                <div key={index}>
                    <FilmsFlip item={item} style={{ }} />
                </div>
            )
        })
    }

    let activeClassDC = dangChieu===true ? 'active__Film' : '';

    let activeClassSC = sapChieu === true ? 'active__Film' : '';

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "130px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,    
        slidesPerRow: 1,
        variableWidth: true,
        responsive: [
          //laptop macbook m1 13inch
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              centerPadding: "130px",
            }
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              centerPadding: "250px",
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              centerMode: true,
              centerPadding: "280px",
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '130px'
            }
          },
          {
            breakpoint: 414,
            settings: {
              slidesToShow: 1,
              slidesPerRow: 1,
              centerMode: false,
            }
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 1,
              slidesPerRow: 1,
              centerMode: false,
            }
          }
        ],
      };
      return (
        <div className="multipRowSlick" id="lichChieu">
            <div className="container">
                <div className="multipRowSlick__top">
                    <span type="button" className={`multipRowSlick__top__button ${activeClassDC}`} onClick={()=>{
                        const action = {
                            type: LAY_PHIM_DANG_CHIEU
                        }
                        dispatch(action)
                    }}>Đang chiếu</span>
                    <span type="button" className={`multipRowSlick__top__button ${activeClassSC}`} onClick={()=>{
                        const action = {
                            type: LAY_PHIM_SAP_CHIEU
                        }
                        dispatch(action)
                    }}>Sắp chiếu</span>
                </div>
                {/* <Slider {...settings}>
                    {renderPhim()}
                </Slider> */}
                <Slider {...settings}>
                    {renderPhim()}
                </Slider>
            </div>
        </div>
      );
}

export default MultipRowSlick


