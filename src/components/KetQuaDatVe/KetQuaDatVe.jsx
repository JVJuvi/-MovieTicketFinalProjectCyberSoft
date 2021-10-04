import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { layThongTinNguoiDungDanNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import Grid from '../../components/Grid/Grid';

export default function KetQuaDatVe() {

    const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('thongTinNguoiDung',thongTinNguoiDung)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layThongTinNguoiDungDanNhapAction())
    },[]);

    const ticketItem = () => {
        return (
            thongTinNguoiDung.thongTinDatVe?.map((ticket,index)=>{

                const seats = _.first(ticket.danhSachGhe);

                return (
                   
                        <div key={index} className="result__menu">
                            <div>
                                <img alt="team" src={ticket.hinhAnh}/>
                            </div>                           
                            <div className="result__menu__detail">
                                <h2>{ticket.tenPhim}</h2>
                                <p>Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")}</p>
                                <p>Ngày chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}</p>
                                <p>Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
                                <p>Ghế: {ticket.danhSachGhe.map((ghe,index)=>{
                                    return (
                                        <span key={index}>{ghe.tenGhe} </span>
                                    )
                                })}
                                </p>
                            </div>
                        </div>
                                 
                )
            })
        )
    }

    return (
        <div className="mt-3">
                <section className="result">
                    <div className="container">
                        <div className="result__title">
                            <h1>Lịch sử đặt vé của khách hàng</h1>
                            <p>Hãy xem thông tin và thời gian chính xác để không ảnh hưởng trải nghiệm tuyệt vời của quý khách</p>
                        </div>
                        <Grid col={3}
                            mdCol={2}
                            smCol={1}
                            gap={15}>                      
                            {ticketItem()}
                        </Grid>
                    </div>
                </section>
        </div>
    )
}
