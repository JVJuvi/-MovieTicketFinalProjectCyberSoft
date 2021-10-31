import React, { Fragment, useEffect, useRef } from 'react';
import { Button, Table, AutoComplete, Input, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, ScheduleOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LayDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAcTion';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';



const { Search } = Input;

export default function Films(props) {

    const {arrPhimDefault} = useSelector(state => state.QuanLyPhimReducer)
    console.log('arrPhimDefault', arrPhimDefault)

    const searchRef = useRef(null)

    const dispatch = useDispatch();

    // phòng trường hợp admin vào trực tiếp trang admin mà 1 số api chỉ call ở trang người dùng thì ta nên call lại ở admin

    useEffect(() => {
        dispatch(LayDanhSachPhimAction(props.match.params.id));
    },[]);

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

                const textantd = 'Bạn có chắc muốn xoá phim';

                const confirm = () => {
                    dispatch(xoaPhimAction(film.maPhim))
                }

                return <Fragment>
                    {/* Chỉnh sửa */}
                    <NavLink key={1} to={`/admin/films/edit/${film.maPhim}`} style={{marginRight: '1rem', fontSize: '2.5rem'}}><EditOutlined style={{color: 'blue'}}/></NavLink>
                    {/* //xoá */}
                    <Popconfirm placement="topLeft" title={textantd} onConfirm={confirm} okText="Yes" cancelText="No">
                        <span key={2} style={{cursor: 'pointer', marginRight: '1rem', fontSize: '2.5rem'}}><DeleteOutlined style={{color: 'red'}}/></span>
                    </Popconfirm>

                    {/* //xếp lịch */}
                    <NavLink key={3} to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                        localStorage.setItem('filmParams', JSON.stringify(film))
                    }}><ScheduleOutlined style={{color: 'green', marginRight: '1rem', fontSize: '2.5rem'}}/></NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        }
    ]

    const data = arrPhimDefault;

    const onSearch = value => {
        console.log(value);
        // gọi api lấy danhSachPhim
        if(searchRef.current) {
            clearTimeout(searchRef.current)
        }
        searchRef.current = setTimeout(()=>{
            dispatch(LayDanhSachPhimAction(value))
        },300);
    };

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    

    return (
        <div>
            <h3 style={{fontSize: '2rem'}}>Quản lý phim</h3>
            <Button style={{marginBottom: '20px'}} onClick={()=>{
                dispatch({
                    type: 'CHANGE_TAB',
                })
                history.push('/admin/films/addnew')
            }}>Thêm phim</Button>
            <br />
            <AutoComplete style={{marginBottom: '40px', width: '100%'}} onSearch={onSearch} placeholder="Tìm phim bằng từ khoá"  />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
