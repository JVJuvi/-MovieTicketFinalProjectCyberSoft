import React, { Fragment, useEffect } from 'react';
import { Button, Table } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined,CalendarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LayDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAcTion';
import { render } from '@testing-library/react';
import { NavLink } from 'react-router-dom';
import { colors } from '@material-ui/core';



const { Search } = Input;

export default function Films(props) {

    const {arrPhimDefault} = useSelector(state => state.QuanLyPhimReducer)
    console.log('arrPhimDefault', arrPhimDefault)

    const dispatch = useDispatch();

    // phòng trường hợp admin vào trực tiếp trang admin mà 1 số api chỉ call ở trang người dùng thì ta nên call lại ở admin

    useEffect(() => {
        dispatch(LayDanhSachPhimAction());
    },[])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            value: (text,object) => {return <span>{text}</span>},
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text,film,index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => {e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50`}}/>
                </Fragment>
            },
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if(tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film, index) => {
                return <Fragment>
                    {film.moTa.length > 100 ? film.moTa.substr(0,100) + ' ... ' : ''}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film, index) => {
                return <Fragment>
                    <NavLink to='/' className="mr-2 text-3xl"><EditOutlined style={{color: 'blue'}}/></NavLink>
                    <NavLink to='/' className="text-3xl"><DeleteOutlined style={{color: 'red'}}/></NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        }
    ]

    const data = arrPhimDefault;

    const onSearch = value => {

        console.log(value);

    };

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý phim</h3>
            <Button className="mb-3">Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="Tìm phim"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
