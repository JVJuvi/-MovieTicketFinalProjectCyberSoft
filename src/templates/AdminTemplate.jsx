import React, { Fragment, useState } from "react";

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

const { Header, Sider, Content } = Layout;



export const AdminTemplate = (props) => {
    //props (path,component)
    const [state, setState] = useState({
        collapsed: false,
    })

    // state = {
    //     collapsed: false,
    // };

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };


    return <Route exact path={props.path} render={(propsRoute) => {

        return <Fragment>
            <Layout>
                <Sider trigger={null} collapsible collapsed={state.collapsed}>
                    <div className="logo text-center"> 
                            <img className="m-2" src="https://picsum.photos/200/200" alt="..." width={50} height={50} style={{borderRadius:'50%'}}/>
                     </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>

                            <NavLink to="/admin/addfilms">
                                Quản lý phim
                            </NavLink>
                          
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            Quản lý người dùng
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            Quản lý lịch chiếu
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {/* {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })} */}
                        {state.collapsed ? <MenuUnfoldOutlined style={{fontSize:25}} onClick={toggle} />  : <MenuFoldOutlined style={{fontSize:25}} onClick={toggle}/>}
                    </Header>
                    <Content
                        className="site-layout-background"
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