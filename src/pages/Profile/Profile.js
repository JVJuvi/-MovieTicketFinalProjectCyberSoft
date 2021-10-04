import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungDanNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash'
import KetQuaDatVe from '../../components/KetQuaDatVe/KetQuaDatVe';



function Profile(props) {

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

    return (
        <section className="profile">
        <div>
            <div className="profile__menu">
            <div className="profile__menu__left">
                <img src="./imageFilm/icon-profile-cgv.png" alt="" />
                <div>
                    <h1>Xin chào {userLogin.hoTen},</h1>
                    <p>Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của mình.</p>
                </div>
            </div>
            <div className="profile__menu__right">
                <h1>Thông tin tài khoản</h1>
                <div>
                    <p className="text-sm">Tài khoản: {userLogin.taiKhoan}</p>
                </div>
                <div>
                    <p className="text-sm">Họ tên: {userLogin.hoTen}</p>
                </div>
                <div>
                    <p className="text-sm">Email: {userLogin.email}</p>  
                </div>
                <div>
                    <p className="text-sm">Loại người dùng: {userLogin.maLoaiNguoiDung}</p>                   
                </div>
                <div>
                    <p className="text-sm">Số điện thoại: {userLogin.soDT}</p>                  
                </div> 
            </div>
            </div>      
        </div>
        </section>
    )
}

export default function (props) {

    const { TabPane } = Tabs;

    const contentStyle = {
        paddingTop: '130px'
    }

    return (
        <div style={{...contentStyle}} className="information">
            <div className="container">
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Thông tin cá nhân " key="1">
                        <Profile />
                    </TabPane>
                    <TabPane tab="Lịch sử đặt vé" key="2">
                        <KetQuaDatVe />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
