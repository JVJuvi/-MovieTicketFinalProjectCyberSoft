import { AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Grid from '../../../../components/Grid/Grid';
import logo from '../../../../assets/images/imageFilm/logo.svg';
import { useTranslation } from 'react-i18next';






export default function Footer() {

    const{arrLogoRap} = useSelector(state => state.QuanLyRapReducer);
    console.log('arrlogo', arrLogoRap);

    //dich ngon ngu
    const { t, i18n } = useTranslation();

    const footerAboutLink = [
        {
            display: t('About Us'),
            path: "/"
        },
        {
            display: t('Careers'),
            path: "/"
        },
        {
            display: t('Contact'),
            path: "/"
        },
        {
            display: t('News'),
            path: "/"
        },
    ]
    
    const footerAboutCustomer = [
        {   
            content: "Hotline: ",
            display: "1234 5678",
            path: "/"
        },
        {
            content: "Email support: ",
            display:  'hoidap@moviestar.vn' ,
            path: "/"
        }
    ]

    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={25}
                >
                    <div>
                        <div className="footer__title">
                        {t('Partner')}
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
                            Movie start
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
                            {t('Customer Service')}
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutCustomer.map((item, index)=>(
                                    <p key={index}>
                                       {item.content}<Link to={item.path}>{item.display}</Link>
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
