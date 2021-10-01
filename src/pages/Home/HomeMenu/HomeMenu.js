import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import './HomeMenu.css';


const { TabPane } = Tabs;


function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const { tabPosition } = state;

    const {arrRap} = props;
    console.log('arrRapSauKhiLay', arrRap)

    return (
        <div id="cumRap" className="homeMenu">
            <div className="container">
            <div className="homeMenu__top">
                <img src="./imageFilm/back-news.png" />
            </div>
            <p className="homeMenu__hidden">
                Kích thước màn hình không đủ để hiển thị hết nội dung
            </p>
            <div className="homeMenu__bottom">
            <Tabs tabPosition={tabPosition} >
               {arrRap.map((heThongRap,index)=>{
                   return (
                    <TabPane tab={
                        <div className="homeMenu__bottom__listCinemas">
                            <img src={heThongRap.logo} />
                        </div>
                    } key={index}>
                        <Tabs tabPosition={tabPosition}>
                            {heThongRap.lstCumRap.splice(0, 6).map((cumRap,index)=>{
                                return (                                   
                                    <TabPane key={index} tab={  
                                        <div className="homeMenu__bottom__homeCinemas">
                                            <img src={cumRap.hinhAnh} alt="..."/>
                                            <div >
                                                <h3>{cumRap.tenCumRap}</h3>
                                                <p >[Chi tiết]</p>
                                            </div>                          
                                        </div> 
                                    }>
                                        {/* load phim */}
                                        {cumRap.danhSachPhim.splice(0,5).map((phim,index)=>{
                                            return (
                                                <Fragment key={index}>
                                                    <div className="homeMenu__bottom__listMovies"> 
                                                        <div className="homeMenu__bottom__listMovies__top" >
                                                            <img src={phim.hinhAnh} alt="" onError={(e)=>{e.target.onerror = null; e.target.src='https://picsum.photos/50/50'}} />
                                                            <div className="homeMenu__bottom__listMovies__top__content" >
                                                                <div>
                                                                    <span>C18</span>
                                                                    <span>{phim.tenPhim}</span>
                                                                </div>
                                                                <p>Địa chỉ: <span>{cumRap.diaChi}</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="homeMenu__bottom__listMovies__bottom">
                                                            {phim.lstLichChieuTheoPhim.splice(0,10).map((lichChieu,index)=>{
                                                                return (
                                                                    <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                        <h5>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</h5>
                                                                    </NavLink>
                                                                    )
                                                                })}
                                                        </div>
                                                        <hr />
                                                    </div>
                                                    
                                                </Fragment>
                                            )
                                        })}
                                    </TabPane>
                                )
                            })} 
                        </Tabs>
                    </TabPane>
                   )
               })}
            </Tabs>
            </div>
            </div>
        </div>
    )
}

export default React.memo(HomeMenu)
