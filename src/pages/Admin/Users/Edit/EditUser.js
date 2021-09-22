import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUP_ID } from '../../../../util/setting';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction, capNhatThongTinNguoiDungAction, layDanhSachNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';


export default function EditUser(props) {

    const [state, setState] = useState({
        maLoaiNguoiDung: []
    });

    const dispatch = useDispatch();

    useEffect( async ()=>{
        dispatch(layDanhSachNguoiDungAction(props.match.params.taikhoan));
        // dispatch(timKiemNguoiDungAction(props.match.params.taikhoan));

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

    const {danhSachNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('danhSachNguoiDung', danhSachNguoiDung)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: danhSachNguoiDung[0].taiKhoan,
            matKhau:  danhSachNguoiDung[0].matKhau,
            email:  danhSachNguoiDung[0].email,
            soDt:  danhSachNguoiDung[0].soDt,
            hoTen:  danhSachNguoiDung[0].hoTen,
            maNhom: GROUP_ID,
            maLoaiNguoiDung: ''
        },
        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUP_ID;
            
            let formData = new FormData();
            for(let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(capNhatThongTinNguoiDungAction(values));
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string(),
            matKhau: Yup.string(),
            hoTen: Yup.string(),
            soDt: Yup.number('Vui lòng mhập số'),
            email: Yup.string().email('Không đúng định dạng email'),
        })
    })

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const { Option } = Select;

    return (
        <div>
            <Form {...layout} onSubmitCapture={formik.handleSubmit} name="nest-messages">
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null} 
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} />
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null} 
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} />
                    {formik.errors.hoTen && formik.touched.hoTen ? (<div className="alert alert-danger">{formik.errors.hoTen}</div>) : null} 
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} />
                    {formik.errors.soDt && formik.touched.soDt ? (<div className="alert alert-danger">{formik.errors.soDt}</div>) : null} 
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger">{formik.errors.email}</div>) : null} 
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select
                         placeholder="chọn loại người dùng" onChange={handleChangeLoaiNguoiDung} options={state.maLoaiNguoiDung.map((loai,index)=>({label: loai.tenLoai, value: loai.maLoaiNguoiDung}))}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
