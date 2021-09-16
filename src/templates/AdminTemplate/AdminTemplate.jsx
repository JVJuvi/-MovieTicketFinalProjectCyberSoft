import React, { Fragment, useEffect, useState } from "react";

//Fragment giống thẻ div mà không hiển thị chỉ dùng để bao bọc trang
import { NavLink, Route } from "react-router-dom"

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import _ from "lodash";
import { history } from "../../App";
import { TOKEN_CYBERSOFT, USER_LOGIN } from "../../util/setting";
import { Redirect } from "react-router";

const { Header, Sider, Content } = Layout;



export const AdminTemplate = (props) => {

    const [state, setState] = useState({
        collapsed: false,
    })
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

    //khi chuyển qua trang admin thì sẽ tự load lên đầu trang
    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    //trang admin chỉ có quản trị viên mới có quyền truy cập nên set userLogin nếu maLoaiNguoiDung khác quản trị thì sẽ cho về home
    if(!localStorage.getItem(USER_LOGIN)) {
        alert("Bạn không có quyền truy cập")
        return <Redirect to='/' />
    }
    if(userLogin.maLoaiNguoiDung !== "QuanTri") {
        alert("Bạn không có quyền truy cập")
        return <Redirect to='/' />
    }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment><button onClick={()=>{
            history.push('/profile')
        }}> <div className="flex align-items-center"> <div className="rounded-full bg-red-500" style={{width: '50px',height: '50px'}}></div> <div> <h5 className="text-white">{userLogin.hoTen}</h5></div> </div> </button> <button className="text-blue-800 transition duration-300 ease-in-out hover:text-blue-200 ml-2" onClick={()=>{
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN_CYBERSOFT);
            history.push('/home');
            window.location.reload();
        }}>Đăng xuất</button> </Fragment>  : ''}
    </Fragment>


    return <Route exact path={props.path} render={(propsRoute) => {

        return <Fragment>
            <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo text-center"> 
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                     </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/user">
                                DashBoard
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <NavLink to="/admin/films">
                                Quản lý phim
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <NavLink to="/admin/showtime">
                                Quản lý lịch chiếu
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-between align-items-center" style={{ padding: 0 }}>
                        {state.collapsed ? <MenuUnfoldOutlined style={{fontSize:25, color: 'white'}} onClick={toggle} />  : <MenuFoldOutlined style={{fontSize:25, color: 'white'}} onClick={toggle}/>}
                        <div className="flex justify-center align-items-center">
                            {operations}
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background bg-white"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                        }}
                    >
                        <props.component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>



        </Fragment>
    }} />

}