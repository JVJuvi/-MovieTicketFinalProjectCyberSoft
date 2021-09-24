import React, { useEffect } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css"
import FilmsFlip from "../Films/FilmsFlip";
import { LAY_PHIM_DANG_CHIEU, LAY_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { useDispatch, useSelector } from 'react-redux';
import Films from "../Films/Films";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick['slick-prev']}`}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick['slick-prev']}`}
        style={{ ...style, display: "block", left: '-50px'}}
        onClick={onClick}
      />
    );
  }

const MultipRowSlick = (props) => {
    const {arrPhim} = props;
    const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const renderPhim = () => {
      return arrPhim.slice(0,12).map((item,index)=>{
          return (
              <div key={index} className={`${styleSlick['width-item']}`}>
                  <FilmsFlip item={item} />
              </div>
          )
      })
  }
    let classButtonActiveDC = dangChieu === true ? 'active_Film': 'none_active_Film';
    let classButtonActiveSC = sapChieu === true ? 'active_Film': 'none_active_Film';
    
    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "130px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,    
        slidesPerRow: 2,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 2300,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              centerPadding: "50px",
            }
          },
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
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              centerPadding: "120px",
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              centerMode: true,
              centerPadding: "300px",
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              centerPadding: '60px'
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            }
          }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
      return (
        <div id="lichChieu">
            <div className="text-center mb-10">
                <span type="button" className={`${styleSlick[classButtonActiveDC]} mr-20`} onClick={()=>{
                    const action = {
                        type: LAY_PHIM_DANG_CHIEU
                    }
                    dispatch(action)
                }}>Đang chiếu</span>
                <span type="button" className={`${styleSlick[classButtonActiveSC]}`} onClick={()=>{
                    const action = {
                        type: LAY_PHIM_SAP_CHIEU
                    }
                    dispatch(action)
                }}>Sắp chiếu</span>
            </div>
          <Slider {...settings}>
            {renderPhim()}
          </Slider>
        </div>
      );
}

export default MultipRowSlick


