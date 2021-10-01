import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu';
import { useDispatch, useSelector } from 'react-redux';
import MultipRowSlick from '../../components/RSlick/MulltipRowSlick';
import Films from '../../components/Films/Films';
import { LayDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAcTion';
import { ChevronLeft } from '@material-ui/icons';
import { layDanhSachCumRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import './Home.css'

export default function Home(props) {

    const dispatch = useDispatch();

    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    console.log('arrPhim', arrPhim)

    const {arrRap} = useSelector(state => state.QuanLyRapReducer);
    console.log('arrRap', arrRap)

    useEffect(()=>{
        dispatch(LayDanhSachPhimAction())
        dispatch(layDanhSachCumRapAction())
    },[])

    return (
        <div className="home">
            <HomeCarousel />  
            <MultipRowSlick arrPhim={arrPhim} />
            <HomeMenu arrRap={arrRap} />
        </div>
    )
}

