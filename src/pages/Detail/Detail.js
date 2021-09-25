import React, { useEffect } from 'react';
import { Button } from '@tsamantanis/react-glassmorphism';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import '../../assets/style/circle.scss';
import { Tabs, Radio, Space } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { layChiTietPhimAction } from '../../redux/actions/QuanLyRapAction';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';


const { TabPane } = Tabs;

export default function Detail(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const { tabPosition } = state;

    const {filmDetail} = useSelector(state => state.QuanLyPhimReducer)
    console.log("filmDetail",filmDetail)

    const dispatch = useDispatch();

    useEffect(()=>{
        // lấy thông tin param từ url
        let {id} = props.match.params;
        console.log('id', id)
        
        dispatch(layChiTietPhimAction(id));

    },[])

    return (
        <div style={{backgroundImage: `url(${filmDetail.hinhAnh})`, maxWidth: '100%',backgroundSize: '100%', minHeight: '100vh', backgroundRepeat: 'no-repeat',}}>
            <CustomCard
                style={{minHeight: '100vh',paddingTop: '150px', background: 'linear-gradient(to top, #0a2029, transparent', borderRadius: '0'}}
                effectColor="black" // required
                color="#14AEFF" // default color is white+
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
                
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{width: '200px', height: '350px'}} alt="123" />
                            <div className="col-span-2 ml-3 text-white" style={{marginTop: '25%'}}>
                                <p className="text-sm">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <span className="text-white bg-red-500 rounded-md mr-1 text-4xl" style={{padding: '2px 10px'}}>C18</span>
                                <span className="text-4xl">{filmDetail.tenPhim}</span>
                                <p className="mt-3">{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 flex flex-col">
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>
                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>
                        </div>
                       <div style={{marginLeft: '50px'}}>
                            <h1 className="text-2xl text-red-500">
                                <Rate allowHalf value={filmDetail.danhGia / 2} />
                            </h1>
                            <h1 className="text-white">Số người đánh giá</h1>
                       </div>
                    </div>
                </div>

                <div className="w-2/3 mt-20 container px-5 py-5">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div >
                                <Tabs tabPosition={tabPosition}>
                                {/* sẽ báo lỗi ko tìm thấy redux vì ban đầu nếu chưa nhận đc api thì sẽ ko có dữ liệu */}
                                    {filmDetail.heThongRapChieu?.map((cumRap,index)=>{
                                        return (
                                            <TabPane tab={
                                                <div className="flex">
                                                    <img src={cumRap.logo} className="rounded-full" style={{width: '50px', height: '50px'}} alt="" />
                                                    <p className="ml-1">{cumRap.tenHeThongRap}</p>
                                                </div>
                                            } key={index}>
                                                {cumRap.cumRapChieu?.map((rap,index)=>{
                                                    return (
                                                        <div key={index}>
                                                            <div className="flex mt-3 mb-10">
                                                                <img src={rap.hinhAnh} style={{height: 60, width: 60}} />
                                                                <div className="ml-2">
                                                                    <h3 className="font-bold text-white text-xl">{rap.tenCumRap}</h3>
                                                                    <p style={{color: '#aba6a6'}}>{rap.diaChi}</p>
                                                                    <div className="grid grid-cols-5 gap-4">
                                                                    {rap.lichChieuPhim.splice(0,10)?.map((lichChieu,index)=>{
                                                                    return (
                                                                        <div key={index} className="col-span-1 mt-3">
                                                                            <NavLink to={`/checkout/${lichChieu.maLichChieu}`}>
                                                                                <h5 style={{display: 'inline-block', padding: '5px 10px', border: '1px solid #d0d0d4', borderRadius: '7px', color: 'green', background: '#ebebec', transition: 'all 300ms'}} className="border-md hover:opacity-50">{moment(lichChieu.ngayChieuGioChieu).format("hh:mmA")}</h5>
                                                                            </NavLink>
                                                                        </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                })}
                                            </TabPane>
                                        )
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2">
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>              
            </CustomCard>
        </div>
    )
}
