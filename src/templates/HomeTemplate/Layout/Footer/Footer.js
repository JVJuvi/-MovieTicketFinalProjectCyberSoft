import { AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Grid from '../../../../components/Grid/Grid';
import logo from '../../../../assets/images/imageFilm/logo.svg';



const footerAboutLink = [
    {
        display: "Giới thiệu",
        path: "/"
    },
    {
        display: "Tuyển dụng",
        path: "/"
    },
    {
        display: "Tin tức",
        path: "/"
    },
    {
        display: "Liên hệ",
        path: "/"
    },
    {
        display: "Hệ thống rạp chiếu",
        path: "/"
    }
]

const footerAboutCustomer = [
    {
        display: "Chính sách đổi trả",
        path: "/"
    },
    {
        display: "Chính sách bảo hành",
        path: "/"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/"
    }
]


export default function Footer() {

    const{arrLogoRap} = useSelector(state => state.QuanLyRapReducer);
    console.log('arrlogo', arrLogoRap)

    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={50}
                >
                    <div>
                        <div className="footer__title">
                            Đối tác
                        </div>
                        <Grid col={4}
                            mdCol={2}
                            smCol={2}
                            gap={50}>
                            {arrLogoRap.map((item,index)=>(
                                <div key={index} className="footer__parner">
                                    <img src={item.logo} alt="..."/>
                                </div>
                            ))}
                        </Grid>
                    </div>
                    <div>
                        <div className="footer__title">
                            Về Movie start
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLink.map((item, index)=>(
                                    <p key={index}>
                                       <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Chăm sóc khánh hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutCustomer.map((item, index)=>(
                                    <p key={index}>
                                       <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__logo">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}
