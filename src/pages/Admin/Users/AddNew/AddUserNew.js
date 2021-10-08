import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUP_ID } from '../../../../util/setting';
import { useDispatch, useSelector } from 'react-redux';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';
import { history } from '../../../../App';

export default function AddUserNew(props) {

    const [state, setState] = useState({
        maLoaiNguoiDung: []
    });

    const dispatch = useDispatch();

    useEffect( async ()=>{
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            console.log('result', result.data);
            setState({
                ...state,
                maLoaiNguoiDung: result.data.content 
            })

        } catch(errors) {
            console.log('errors', errors.response?.data)
        }

    },[])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau:  '',
            email:  '',
            soDT:  '',
            hoTen:  '',
            maNhom: GROUP_ID,
            maLoaiNguoiDung: 'KhachHang'
        },
        onSubmit: (values) => {
            values.maNhom = GROUP_ID;
            console.log('values', values);
            dispatch(themNguoiDungAction(values));
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string(),
            matKhau: Yup.string(),
            hoTen: Yup.string(),
            soDT: Yup.number('Vui lòng mhập số'),
            email: Yup.string().email('Không đúng định dạng email'),
        })
    })

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    // const layout = {
    //     labelCol: { span: 4 },
    //     wrapperCol: { span: 14 },
    // };

    return (
        <div>
            <a onClick={()=>{
                history.goBack();
            }}><i class='bx bx-left-arrow-alt'></i> Trở về</a>
        <div className="container">
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }} 
                layout="horizontal" onSubmitCapture={formik.handleSubmit} name="nest-messages">
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null} 
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null} 
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.hoTen && formik.touched.hoTen ? (<div className="alert alert-danger">{formik.errors.hoTen}</div>) : null} 
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDT" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.soDT && formik.touched.soDT ? (<div className="alert alert-danger">{formik.errors.soDT}</div>) : null} 
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger">{formik.errors.email}</div>) : null} 
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select
                         placeholder="chọn loại người dùng" onChange={handleChangeLoaiNguoiDung} options={state.maLoaiNguoiDung.map((loai,index)=>({label: loai.tenLoai, value: loai.maLoaiNguoiDung}))}
                    />
                </Form.Item>
                <Form.Item label="Hành động">
                    <Button type="primary" htmlType="submit">
                    Thêm người dùng
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    )
}
