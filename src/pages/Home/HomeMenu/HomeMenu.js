import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';


const { TabPane } = Tabs;


export default function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const { tabPosition } = state;

    const {arrRap} = props;

    return (
        <div>
            <Tabs tabPosition={tabPosition}>
               {arrRap.map((heThongRap,index)=>{
                   return (
                    <TabPane tab={<img src={heThongRap.logo} width={50} className="rounded-full" />} key={index}>
                        <Tabs tabPosition={tabPosition}>
                            {heThongRap.lstCumRap.splice(0, 6).map((cumRap,index)=>{
                                return (                                   
                                    <TabPane key={index} tab={
                                        <div className="flex" style={{width: '350px'}}>
                                            <img src={cumRap.hinhAnh} width={50} alt="..." className="mr-2" />
                                            <div>
                                                {cumRap.tenCumRap}
                                                <p className="text-red-500 text-left transition-all duration-200 ease-in-out hover:text-red-300">Chi tiết</p>
                                            </div>
                                        </div>
                                    }>
                                        {/* load phim */}
                                        {cumRap.danhSachPhim.splice(0,6).map((phim,index)=>{
                                            return (
                                                <Fragment key={index}>
                                                    <div className="my-3 flex">
                                                        <div className="flex">
                                                            <img src={phim.hinhAnh} alt="" style={{maxWidth: '50px', maxHeight: '50px'}} onError={(e)=>{e.target.onerror = null; e.target.src='https://picsum.photos/50/50'}} />
                                                            <div className="ml-2 mt-2">
                                                                <h3>{phim.tenPhim}</h3>
                                                                <p className="text-red-500">Địa chỉ: <span className="text-black">{cumRap.diaChi}</span></p>
                                                                <div className="grid grid-cols-5 gap-4">
                                                                    <d className="text-red-500">Thời gian: </d>
                                                                    {phim.lstLichChieuTheoPhim.splice(0,10).map((lichChieu,index)=>{
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
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
    )
}
