import { AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Grid from '../../../../components/Grid/Grid';
import logo from '../../../../assets/images/imageFilm/logo.svg';



const footerAboutLink = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Hệ thống rạp chiếu",
        path: "/about"
    }
]

const footerAboutCustomer = [
    {
        display: "Chính sách đổi trả",
        path: "/about"
    },
    {
        display: "Chính sách bảo hành",
        path: "/about"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/about"
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
                        <div className="footer__parner">
                            {arrLogoRap.map((item,index)=>(
                                <div key={index} className="my-3">
                                    <img src={item.logo} alt="..." width={50} />
                                </div>
                            ))}
                        </div>
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
                        <p>
                            <Link to="/">
                                <img className="footer__logo" src={logo} alt="" width={300} height={100} />
                            </Link>
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}
