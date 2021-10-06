import React, { Fragment, useEffect, useState } from "react";
import './AdminTemplate.css';
//Fragment giống thẻ div mà không hiển thị chỉ dùng để bao bọc trang
import { NavLink, Route } from "react-router-dom"

import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import _ from "lodash";
import { history } from "../../App";
import { TOKEN_CYBERSOFT, USER_LOGIN } from "../../util/setting";
import { Redirect } from "react-router";
import SubMenu from "antd/lib/menu/SubMenu";

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

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

    const {activeKey} = useSelector(state => state.QuanLyPhimReducer);
    console.log('activeKey', activeKey)

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
        <p onClick={()=>{
                    history.push('/profile')
                }} className="header__menu__item">
                   <i class='bx bxs-user' ></i> Hello {userLogin.hoTen}!
            </p>
            <p className="header__menu__item" onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN_CYBERSOFT);
                history.push('/home');
                window.location.reload();
                }}><span>Đăng xuất</span>
            </p>
    </Fragment>




    return <Route exact path={props.path} render={(propsRoute) => {

        return <Fragment>
            <Layout>
                <Sider className="sider">
                    <div style={{marginBottom: '27px'}}> 
                        <NavLink to="/">
                            <img src="./imageFilm/logo.svg" alt="..." />
                        </NavLink>
                     </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin">
                                DashBoard
                            </NavLink>  
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Quản lý phim">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>                         
                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>             
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Quản lý người dùng">
                            <Menu.Item key="13" icon={<FileOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>                         
                            </Menu.Item>
                            <Menu.Item key="14" icon={<FileOutlined />}>
                                <NavLink to="/admin/users/addnew">Add new</NavLink>             
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, }}>
                        <div className="text-right pr-10 pt-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {operations}
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background "
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