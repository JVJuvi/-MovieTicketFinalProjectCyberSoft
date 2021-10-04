import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { Tabs, Radio, Space } from 'antd';
import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { layChiTietPhimAction } from '../../redux/actions/QuanLyRapAction';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Grid from '../../components/Grid/Grid';
import '../../assets/style/circle.scss';
import _ from 'lodash';



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
        <div className="detail" style={{backgroundImage: `url(${filmDetail.hinhAnh})`, maxWidth: '100%',backgroundSize: '100%', backgroundRepeat: 'no-repeat',}}>
            <CustomCard
                style={{paddingTop: '150px', background: 'linear-gradient(to top, #0a2029, transparent', borderRadius: '0'}}
                effectColor="black" // required
                color="#14AEFF" // default color is white+
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
                
            >
                <div className="container">
                <div className="detail__top">
                <Grid col={4}
                    mdCol={3}
                    smCol={1}
                    gap={15}
                    >
                    <div className="detail__top__img">
                        <img src={filmDetail.hinhAnh}s alt="123" />
                    </div>
                    <div className="detail__top__content">
                        <p>{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                        <div className="detail__top__content__title">
                            <span>C18</span>
                            <span>{filmDetail.tenPhim}</span>
                        </div>
                    </div> 
                    <div className="detail__top__hidden"></div>
                    <div className="detail__top__circle">
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>
                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>
                        </div>
                       <div style={{textAlign: 'center'}}>
                            <h1>
                                <Rate allowHalf value={filmDetail.danhGia / 2} />
                            </h1>
                            <h1 style={{color: 'white', fontSize: '20px'}}>Số người đánh giá</h1>
                       </div>
                    </div>
                </Grid>
                </div>

                  
                </div>           
            </CustomCard>
            <div className="detail__bottom">
                <div className="container">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <p className="detail__bottom__hidden">
                                Kích thước màn hình không đủ để hiển thị hết nội dung
                            </p>
                            <div className="detail__bottom__schedule">
                                {!_.isEmpty(filmDetail.heThongRapChieu) ?  
                                
                                <Tabs tabPosition={tabPosition}>
                                {/* sẽ báo lỗi ko tìm thấy redux vì ban đầu nếu chưa nhận đc api thì sẽ ko có dữ liệu */}
                                    {filmDetail.heThongRapChieu?.map((cumRap,index)=>{
                                        return (
                                            <TabPane tab={
                                                <div className="detail__bottom__schedule__left" >
                                                    <img src={cumRap.logo} alt="" />
                                                    <p>{cumRap.tenHeThongRap}</p>
                                                </div>
                                            } key={index}>
                                                {cumRap.cumRapChieu.splice(0,4)?.map((rap,index)=>{
                                                    return (
                                                        <div className="detail__bottom__schedule__right">
                                                            <div key={index} className="detail__bottom__schedule__right__time">
                                                                <img src={rap.hinhAnh}/>
                                                                <div>
                                                                    <h3 className="detail__bottom__title">{rap.tenCumRap}</h3>
                                                                    <p className="detail__bottom__info">{rap.diaChi}</p>                               
                                                                </div>
                                                            </div>
                                                            <div className="detail__bottom__schedule__right__ticket">
                                                                    {rap.lichChieuPhim.splice(0,6)?.map((lichChieu,index)=>{
                                                                    return (
                                                                        <div key={index}>
                                                                            <NavLink to={`/checkout/${lichChieu.maLichChieu}`} onClick={()=>{
                                                                                localStorage.setItem('filmDetail', JSON.stringify(cumRap))
                                                                            }}>
                                                                                <h5>{moment(lichChieu.ngayChieuGioChieu).format("hh:mmA")}</h5>
                                                                            </NavLink>
                                                                        </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                        </div>                                                     
                                                    )
                                                })}
                                            </TabPane>
                                        )
                                    })}
                                </Tabs>
                                : <>
                                    <span style={{color: 'white'}}>Không có suất chiếu</span>
                                </>};

                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2">
                            <div className="detail__bottom__intro">
                                <div className="detail__bottom__intro__left">
                                    <div className="detail__bottom__intro__left__flex">
                                        <p className="detail__bottom__intro__title">Ngày công chiếu</p>
                                        <p className="detail__bottom__intro__info">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                    </div>
                                    <div className="detail__bottom__intro__left__flex">
                                        <p className="detail__bottom__intro__title">Đạo diễn</p>
                                        <p className="detail__bottom__intro__info"></p>
                                    </div>
                                    <div className="detail__bottom__intro__left__flex">
                                        <p className="detail__bottom__intro__title">Diễn viên</p>
                                        <p className="detail__bottom__intro__info"></p>
                                    </div>
                                    <div className="detail__bottom__intro__left__flex">
                                        <p className="detail__bottom__intro__title">Thể Loại</p>
                                        <p className="detail__bottom__intro__info"></p>
                                    </div>
                                    <div className="detail__bottom__intro__left__flex">
                                        <p className="detail__bottom__intro__title">Định dạng</p>
                                        <p className="detail__bottom__intro__info"></p>
                                    </div>
                                </div>
                                <div className="detail__bottom__intro__right">
                                    <p>Nội dung</p>
                                    <p>{filmDetail.moTa}</p>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">
                            
                        </TabPane>
                    </Tabs>
                </div>
            </div> 
        </div>
    )

    
}
