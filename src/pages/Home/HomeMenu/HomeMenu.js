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
        <div id="cumRap">
            <div>
                <img src="./imageFilm/back-news.png" />
            </div>
            <div className="border-2 p-5">
            <Tabs tabPosition={tabPosition} >
               {arrRap.map((heThongRap,index)=>{
                   return (
                    <TabPane tab={<img src={heThongRap.logo} width={50} className="rounded-full" />} key={index}>
                        <Tabs tabPosition={tabPosition}>
                            {heThongRap.lstCumRap.splice(0, 6).map((cumRap,index)=>{
                                return (                                   
                                    <TabPane key={index} tab={
                                        <div className="flex" style={{width: '350px'}}>
                                            <img src={cumRap.hinhAnh} width={60} alt="..." className="mr-2" />
                                            <div>
                                                {cumRap.tenCumRap}
                                                <p className="text-red-500 text-left transition-all duration-200 ease-in-out hover:text-red-300">[Chi tiết]</p>
                                            </div>
                                        </div>
                                    }>
                                        {/* load phim */}
                                        {cumRap.danhSachPhim.splice(0,6).map((phim,index)=>{
                                            return (
                                                <Fragment key={index}>
                                                    <div className="my-3 flex">
                                                        <div className="flex">
                                                            <img src={phim.hinhAnh} alt="" style={{height: 60, width: 40}} onError={(e)=>{e.target.onerror = null; e.target.src='https://picsum.photos/50/50'}} />
                                                            <div className="ml-2">
                                                                <span className="text-white bg-red-500 rounded-md mr-1" style={{padding: '2px 10px'}}>C18</span>
                                                                <span className="text-lg font-bold text-black">{phim.tenPhim}</span>
                                                                <p className="text-red-500">Địa chỉ: <span className="text-black">{cumRap.diaChi}</span></p>
                                                                <div className="grid grid-cols-5 gap-4">
                                                                    {phim.lstLichChieuTheoPhim.splice(0,10).map((lichChieu,index)=>{
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                            <h5 style={{display: 'inline-block', padding: '5px 10px', border: '1px solid #d0d0d4', borderRadius: '7px', color: 'green', background: '#ebebec', transition: 'all 300ms'}} className="border-md hover:opacity-50">{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</h5>
                                                                        </NavLink>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
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
    )
}

export default React.memo(HomeMenu)
