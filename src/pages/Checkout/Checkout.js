import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from "./Checkout.module.css";
import { datVeAction, layChiTietPhongVeAcTion, datGheAction } from '../../redux/actions/QuanLyDatVeAction';
import './Checkout.css';
import { CheckOutlined, CloseCircleOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { DAT_VE } from '../../redux/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index';



function Checkout(props) {

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)

    const {chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat} = useSelector(state => state.QuanLyDatVeReducer);
    console.log('danhSachGheKhachDat', danhSachGheKhachDat)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layChiTietPhongVeAcTion(props.match.params.id))

        //load danh sách ghê đang đặt từ server về (lắng nghe tính hiệu từ server trả về)
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            console.log('danhSachGheKhachDat', dsGheKhachDat);
            //bước 1 loại mình ra khỏi danh sách
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)
            //bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
            let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
                let stringItem = JSON.parse(item.danhSachGhe);
                return [...result,...stringItem]
            },[])
            console.log('arrGheKhachDat',arrGheKhachDat)

        })

    },[])

    console.log('chiTietPhongVe', chiTietPhongVe)
    console.log('danhSachGheDangDat',danhSachGheDangDat)

    const {danhSachGhe, thongTinPhim} = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe.map((ghe,index)=>{

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classDaDat = ghe.daDat === true ? 'gheDuocChon' : '';
            let classDangDat = '';
            let classGheMinhDat = '';
            if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheMinhDat = 'gheMinhDat';
            }
            
            let indexDD = danhSachGheDangDat.findIndex(item => item.maGhe === ghe.maGhe);
            if(indexDD !== -1) {
                classDangDat = 'gheDangChon'
            }
            let classgheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(ghehKD => ghehKD.maGhe === ghe.maGhe)
            if(indexGheKD !== -1) {
                classgheKhachDat = 'gheKhachDat'
            }


            return (
                <Fragment key={index}>
                    <button disabled={ghe.daDat || classgheKhachDat !== ''} className={`ghe ${classGheVip} ${classDaDat} ${classDangDat} ${classGheMinhDat} ${classgheKhachDat}`} onClick={()=>{
                        const action = datGheAction(ghe, props.match.params.id);
                        dispatch(action)
                    }}>
                        {ghe.daDat ? classGheMinhDat != '' ? <UserOutlined /> : <CloseCircleOutlined /> : classgheKhachDat !== '' ? <SmileOutlined /> : ghe.stt}
                    </button>
                    {(index + 1)%16 === 0 ? <br /> : ''}
                </Fragment>
            )
        })
    }
  
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black w-full rounded-sm" style={{width: '80%', height:'10px'}}></div>
                        <div style={{textAlign: 'center'}} className={`${style['trapezoid']}`}>
                            <h3 className="mt-1">Màn hình</h3>
                        </div>
                        <div className="mt-20">
                            {renderSeats()}
                        </div>
                        <div className="flex items-center mt-3">
                            <table className="table-fixed text-center">
                                <thead className="px-10">
                                    <tr>
                                        <th className="w-1/5">Ghế chưa đặt</th>
                                        <th className="w-1/5">Ghế đang đặt</th>
                                        <th className="w-1/5">Ghế VIP</th>
                                        <th className="w-1/5">Ghế đã được đặt</th>
                                        <th className="w-1/5">Ghế mình đặt</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-3">
                                    <tr>
                                        <td><button className="ghe">Stt</button></td>
                                        <td><button className="gheDangChon">Stt</button></td>
                                        <td><button className="gheVip">Stt</button></td>
                                        <td><button className="gheDuocChon"><CloseCircleOutlined /></button></td>
                                        <td><button className="gheMinhDat"><CheckOutlined /></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border-2 min-h-screen">
                    <div className="px-2">
                        <h1 className="text-4xl text-center mt-3" style={{color: '#7ed321'}}>{danhSachGheDangDat.reduce((tongTien,item,index)=>{
                                return tongTien += item.giaVe
                            },0).toLocaleString()} đ</h1>
                        <hr />
                        <div className="flex items-center my-3">
                            <span className="text-white bg-red-500 rounded-md mr-1" style={{padding: '2px 10px'}}>C18</span>
                            <span className="text-2xl">{thongTinPhim.tenPhim}</span>
                        </div>
                        <div className="my-3">
                            <p className="m-0">{thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                            <p className="m-0">{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between my-3">
                            <div>
                                <span className="text-red-500 mr-2">Ghế </span>
                                {/* // lodash sortBy giup sap xep thu tu */}
                                {_.sortBy(danhSachGheDangDat,['stt']).map((item,index)=>{
                                    return <span key={index} className="text-green-500 text-xl"> {item.stt} </span>
                                })}
                            </div>
                        </div>
                        <hr />
                        <div className="py-3">
                            <h1>Email</h1>
                            <p>{userLogin.email}</p>
                            {/* thay input bằng reducer email */}
                        </div>                  
                        <div className="h-full flex flex-col justify-end" style={{marginTop: '100px'}}>
                            <button className="bg-green-400 rounded-sm p-3 text-white font-bold text-3xl" onClick={()=>{
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                                console.log('thongTinDatVe', thongTinDatVe)
                                
                                dispatch(datVeAction(thongTinDatVe))
                            }}>ĐẶT VÉ</button>
                        </div>                     
                    </div>
                </div>
            </div>
        </div>  
    )
}

function KetQuaDatVe(props) {

    const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('thongTinNguoiDung',thongTinNguoiDung)
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layThongTinNguoiDungAction())
    },[])

    const ticketItem = () => {
        return (
            thongTinNguoiDung.thongTinDatVe?.map((ticket,index)=>{

                const seats = _.first(ticket.danhSachGhe);

                return (
                    <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                        <div className="flex-grow">
                            <h2 className="text-gray-900 title-font font-medium text-3xl">{ticket.tenPhim}</h2>
                            <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}</p>
                            <p>Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
                            {ticket.danhSachGhe.map((ghe,index)=>{
                                return (
                                    <span key={index}>{ghe.tenGhe} </span>
                                )
                            })}
                        </div>
                        </div>
                    </div>              
                )
            })
        )
    }

    return (
        <div className="mt-3">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-800">Lịch sử đặt vé của khách hàng</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin và thời gian chính xác để không ảnh hưởng trải nghiệm tuyệt vời của qus khách</p>
                        </div>
                        <div className="flex flex-wrap -m-2">                      
                            {ticketItem()}
                        </div>
                    </div>
                </section>
        </div>
    )
}

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
  }
  
export default function (props) {

    const {tabActive} = useSelector(state => state.QuanLyDatVeReducer);
    console.log('tabActive', tabActive)

    const dispatch = useDispatch();

    return (
        <div className="min-h-screen">
            <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key)=>{
                dispatch({
                    type: 'CHUYEN_TAB_ACTIVE',
                    payload: key
                })
            }}>
                <TabPane tab="01 CHỌN GHÊ & THANH TOÁN" key="1">
                        <Checkout {...props}/> 
                </TabPane>
                <TabPane tab="02 KẾT QUẢ ĐẶT GHẾ" key="2">
                        <KetQuaDatVe {...props} />
                </TabPane>
            </Tabs>
        </div>
    )
} 