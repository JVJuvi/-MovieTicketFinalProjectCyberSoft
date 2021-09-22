import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungDanNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash'



function Profile(props) {

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

    return (
        <section className="p-6 bg-coolGray-100 text-coolGray-900">
            <form novalidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-coolGray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Personal Inormation</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Tài khoản</h2>
                            <p>{userLogin.taiKhoan}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Họ tên</h2>
                            <p>{userLogin.hoTen}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Email</h2>
                            <p>{userLogin.email}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Loại người dùng</h2>
                            <p>{userLogin.maLoaiNguoiDung}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Nhóm</h2>
                            <p>{userLogin.maNhom}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <h2 className="text-sm">Số điện thoại</h2>
                            <p>{userLogin.soDT}</p>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

function LishSuDatVe(props) {
    const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('thongTinNguoiDung',thongTinNguoiDung)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layThongTinNguoiDungDanNhapAction())
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

export default function (props) {

    const { TabPane } = Tabs;

    const contentStyle = {
        paddingTop: '100px'
    }

    return (
        <div style={{...contentStyle}} className="px-5">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin cá nhân " key="1">
                    <Profile />
                </TabPane>
                <TabPane tab="Lịch sử đặt vé" key="2">
                    <LishSuDatVe />
                </TabPane>
            </Tabs>
        </div>
    )
}
