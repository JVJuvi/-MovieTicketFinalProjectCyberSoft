import React, { Fragment, useEffect, useRef } from 'react';
import { Button, Table, AutoComplete, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, ScheduleOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LayDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAcTion';
import { NavLink } from 'react-router-dom';
import { layDanhSachNguoiDungAction, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../App';

export default function Users(props) {

    useEffect(()=>{
        dispatch(layDanhSachNguoiDungAction());
    },[])

    const {danhSachNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('danhSachNguoiDung', danhSachNguoiDung)

    const dispatch = useDispatch();

    const searchRef = useRef(null)

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            value: (text,object) => {return <span>{text}</span>},
            sorter: (a, b) => a.stt - b.stt,
            sortDirections: ['descend', 'ascend'],
            width: '5%'
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: '15%'
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',         
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',        
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',           
            sortDirections: ['descend', 'ascend'],
            width: '20%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, user, index) => {

                const textantd = 'Bạn có chắc muốn xoá tài khoản';

                const confirm = () => {
                    dispatch(xoaNguoiDungAction(user.taiKhoan))
                }

                return <Fragment>
                    <NavLink key={1} to={`/admin/users/edit/${user.taiKhoan}`} style={{marginRight: '1rem', fontSize: '2.5rem'}}><EditOutlined style={{color: 'blue'}}/></NavLink>
                    {/* <span key={2} style={{cursor: 'pointer', marginRight: '1rem', fontSize: '2.5rem'}} onClick={()=>{
                        if(window.confirm('Bạn có chắc muốn xoá tài khoản ' + user.taiKhoan)) {
                            dispatch(xoaNguoiDungAction(user.taiKhoan))
                        }
                    }}><DeleteOutlined style={{color: 'red'}}/></span> */}

                    <Popconfirm placement="topLeft" title={textantd} onConfirm={confirm} okText="Yes" cancelText="No">
                        <span key={2} style={{cursor: 'pointer', marginRight: '1rem', fontSize: '2.5rem'}}><DeleteOutlined style={{color: 'red'}}/></span>
                    </Popconfirm>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        }
    ]

    const onSearch = value => {
        console.log(value);
        // gọi api lấy danhSachPhim
        if(searchRef.current) {
            clearTimeout(searchRef.current)
        }
        searchRef.current = setTimeout(()=>{
            dispatch(layDanhSachNguoiDungAction(value))
        },400);
    };

    const data = danhSachNguoiDung

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý người dùng</h3>
            <Button style={{marginBottom: '20px'}} onClick={()=>{
                history.push('/admin/users/addnew')
            }} >Thêm người dùng</Button>
            <br />
            <AutoComplete style={{marginBottom: '40px', width: '100%'}} placeholder="Tìm người dùng từ khoá" onSearch={onSearch} />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
            {/* thêm dataSource={data} vào trong table rồi gán data = redux thì mỗi lần fill dữ liệu sẽ dễ đi */}
        </div>
    )
}
