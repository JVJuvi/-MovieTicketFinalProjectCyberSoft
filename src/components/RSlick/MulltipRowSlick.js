import React from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css"
import FilmsFlip from "../Films/FilmsFlip";
import { LAY_PHIM_DANG_CHIEU, LAY_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { useDispatch, useSelector } from 'react-redux';

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
      return arrPhim.map((item,index)=>{
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
        centerPadding: "140px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,    
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
      return (
        <div>
            <button type="button" className={`px-8 py-3 font-semibold border rounded ${styleSlick[classButtonActiveDC]} mr-3`} onClick={()=>{
                const action = {
                    type: LAY_PHIM_DANG_CHIEU
                }
                dispatch(action)
            }}>PHIM ĐANG CHIẾU</button>
            <button type="button" className={`px-8 py-3 font-semibold border rounded ${styleSlick[classButtonActiveSC]}`} onClick={()=>{
                const action = {
                    type: LAY_PHIM_SAP_CHIEU
                }
                dispatch(action)
            }}>PHIM SẮP CHIẾU</button>
          <Slider {...settings}>
            {renderPhim()}
          </Slider>
        </div>
      );
}

export default MultipRowSlick


