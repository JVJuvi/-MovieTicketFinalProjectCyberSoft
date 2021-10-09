import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datVeAction, layChiTietPhongVeAcTion, datGheAction } from '../../redux/actions/QuanLyDatVeAction';
import { CheckOutlined, CloseCircleOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { DAT_GHE} from '../../redux/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { connection } from '../../index';
import { history } from '../../App';
import KetQuaDatVe from '../../components/KetQuaDatVe/KetQuaDatVe';




function Checkout(props) {

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin', userLogin)

    const {chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat} = useSelector(state => state.QuanLyDatVeReducer);
    console.log('danhSachGheKhachDat', danhSachGheKhachDat)
    const dispatch = useDispatch();

    useEffect(()=>{
        const action = layChiTietPhongVeAcTion(props.match.params.id);
        dispatch(action);

        // có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó 
        connection.on("datVeThanhCong", () => {
            dispatch(action);
        })

        // vừa vào trang load tất vả ghế của các người khác đang đặt
        connection.invoke("loadDanhSachGhe", props.match.params.id);



        //load danh sách ghê đang đặt từ server về (lắng nghe tính hiệu từ server trả về)
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            console.log('danhSachGheKhachDat', dsGheKhachDat);
            //bước 1 loại mình ra khỏi danh sách
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)

            //bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
            let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
                let stringItem = JSON.parse(item.danhSachGhe);
                return [...result,...stringItem]
            },[]);
            //không được để có mã ghế trùng nhau nếu 2 tài khoản cùng chọn 1 mã ghế sao đó đưa lên redux
            arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe');
            console.log('arrGheKhachDat',arrGheKhachDat)

            dispatch({
                type: DAT_GHE,
                payload: arrGheKhachDat,
            })
        })

        // cài đặc sự kiện khi reload trang
        window.addEventListener("beforeunload", clearGhe );


        return () => {
            clearGhe()
            window.removeEventListener("beforeunload", clearGhe)
        }

    },[])



    const clearGhe = function(event) { 
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }




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

    let filmDetail = {};
    if(localStorage.getItem('filmDetail')) {
        filmDetail = JSON.parse(localStorage.getItem('filmDetail'))
    }
    console.log('filmDetaillogo', filmDetail);
  
    return (
        <div>
             <p className="hidden">
                Kích thước màn hình không đủ để hiển thị hết nội dung
            </p>
            <div className="chooseSeat container">
                <div className="chooseSeat__left">
                    <div className="chooseSeat__left__logo"> 
                        <img src={filmDetail.logo} alt="" />
                        <div>
                            <span>{thongTinPhim.tenCumRap}</span>
                            <span> - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</span>
                        </div>
                    </div>
                    <div className="chooseSeat__left__seat">
                        <div className="chooseSeat__left__seat__tv"></div> 
                        <div style={{textAlign: 'center'}} className="trapezoid">
                            <h3>Màn hình</h3>
                        </div>
                        <div className="chooseSeat__left__seat__seats" style={{marginTop: '60px'}}>
                            {renderSeats()}
                        </div>
                        <div className="chooseSeat__left__seat__table">
                            <table>
                                <thead className="px-10">
                                    <tr>
                                        <th className="px-3">Ghế chưa đặt</th>
                                        <th className="px-3">Ghế đang đặt</th>
                                        <th className="px-3">Ghế VIP</th>
                                        <th className="px-3">Ghế đã được đặt</th>
                                        <th className="px-3">Ghế mình đặt</th>
                                        <th className="px-3">Ghế người khác đang đặt</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-3">
                                    <tr>
                                        <td><button className="ghe">Stt</button></td>
                                        <td><button className="gheDangChon">Stt</button></td>
                                        <td><button className="gheVip">Stt</button></td>
                                        <td><button className="gheDuocChon"><CloseCircleOutlined /></button></td>
                                        <td><button className="gheMinhDat"><CheckOutlined /></button></td>
                                        <td><button className="gheKhachDat"><CloseCircleOutlined /></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="chooseSeat__right">
                    <div style={{padding: '0 20px'}}>
                        <h1 className="chooseSeat__right__price">{danhSachGheDangDat.reduce((tongTien,item,index)=>{
                                return tongTien += item.giaVe
                            },0).toLocaleString()}VND</h1>
                        <hr />
                        <div className="chooseSeat__right__name">
                            <span>C18</span>
                            <span>{thongTinPhim.tenPhim}</span>
                        </div>
                        <div className="chooseSeat__right__time">
                            <p>{thongTinPhim.tenCumRap}</p>
                            <p>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
                        </div>
                        <hr />
                        <div className="chooseSeat__right__NS">
                            
                                <span>Ghế </span>
                                {/* // lodash sortBy giup sap xep thu tu */}
                                {_.sortBy(danhSachGheDangDat,['stt']).map((item,index)=>{
                                    return <span key={index}> {item.stt} </span>
                                })}
                            
                        </div>
                        <hr />
                        <div className="chooseSeat__right__detail">
                            <i>Email</i>
                            <p>{userLogin.email}</p>
                            {/* thay input bằng reducer email */}
                        </div>  
                        <hr />
                        <div className="chooseSeat__right__detail">
                            <i>Số điện thoại</i>
                            <p>{userLogin.soDT}</p>
                            {/* thay input bằng reducer email */}
                        </div> 
                        <hr />
                    </div>
                    <div className="chooseSeat__right__submit">
                            <div className="chooseSeat__right__submit__warming" >
                                <p><i class='bx bx-message-square-error'></i>Vé đã mua không thể đổi hoặc hoàn tiền </p>
                                <p>Mã vé sẽ được gửi qua tin nhắn ZMS (tin nhắn Zalo) và Email đã nhập</p>
                            </div>
                            <button onClick={()=>{
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                                dispatch(datVeAction(thongTinDatVe))
                            }}>ĐẶT VÉ</button>
                        </div>
                </div>
            </div>
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

    useEffect(()=>{
        return ()=>{
            dispatch({
                type: 'CHUYEN_TAB_ACTIVE',
                payload: '1'
            })
        }
    },[])

    

    return (
        <div className="checkout">
            <div>
                <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key)=>{
                    dispatch({
                        type: 'CHUYEN_TAB_ACTIVE',
                        payload: key
                    })
                }}>
                    <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                            <Checkout {...props}/> 
                    </TabPane>
                    <TabPane tab="02 KẾT QUẢ ĐẶT GHẾ" key="2">
                            <KetQuaDatVe />
                    </TabPane>
                    <TabPane tab={<span onClick={()=>{
                        history.push('/home')
                        }}>03 TRỞ VỀ HOME</span>} key="3">                     
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
} 