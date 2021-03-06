import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
// import styleSlick from "./MultipleRowSlick.module.css"
import FilmsFlip from "../Films/FilmsFlip";
import { LAY_PHIM_DANG_CHIEU, LAY_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash";
import { useTranslation } from "react-i18next";



const MultipRowSlick = (props) => {

    const {arrPhim} = props;
    const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);

    console.log('dang chieu', dangChieu)
    console.log('sapChieu', sapChieu)
    
    const dispatch = useDispatch();

    //lọc ra phim nào đang chiếu và sắp chiếu
    const renderPhim = () => {
        let arrFilter = [];
        if(dangChieu === true) {
            arrFilter = _.filter(arrPhim, {'dangChieu': true});
        } else {
            arrFilter = _.filter(arrPhim, {'sapChieu': true});
        }

        console.log('arrFilter', arrFilter)
        return arrFilter.slice(0,12).map((item,index)=>{
            return (
                <div key={index}>
                    <FilmsFlip item={item} style={{ }} />
                </div>
            )
        })
    }

    //dich ngon ngu
    const { t, i18n } = useTranslation();

    let activeClassDC = dangChieu===true ? 'active__Film' : '';

    let activeClassSC = sapChieu === true ? 'active__Film' : '';

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0rem",
        slidesToShow: 4,
        speed: 500,
        rows: 2,    
        slidesPerRow: 1,
        variableWidth: true,
        responsive: [
          //laptop macbook m1 13inch
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              centerPadding: "0rem",
            }
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
              centerMode: true,
              centerPadding: "0rem",
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
              centerMode: true,
              centerPadding: "0",
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              centerMode: true,
              centerPadding: '0'
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 3,
              centerMode: true,
              centerPadding: '0'
            }
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              centerPadding: '0'
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
                            type: LAY_PHIM_DANG_CHIEU,
                            payload: true
                        }
                        dispatch(action)
                    }}>{t('Now Showing')}</span>
                    <span type="button" className={`multipRowSlick__top__button ${activeClassSC}`} onClick={()=>{
                        const action = {
                            type: LAY_PHIM_SAP_CHIEU,
                            payload: true
                        }
                        dispatch(action)
                    }}>{t('Coming Soon')}</span>
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


