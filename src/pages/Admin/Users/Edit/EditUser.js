import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUP_ID } from '../../../../util/setting';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction, capNhatThongTinNguoiDungAction, layDanhSachNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';
import { Prompt } from 'react-router';
import { history } from '../../../../App';


export default function EditUser(props) {

    const [state, setState] = useState({
        maLoaiNguoiDungAPI: []
    });

    const [promt, setPromt] = useState({
        taiKhoan: '',
        matKhau:  '',
        email:  '',
        soDt:  '',
        hoTen:  '',
        maLoaiNguoiDung: '',    
        status: true
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
                maLoaiNguoiDungAPI: result.data.content 
            })

        } catch(errors) {
            console.log('errors', errors.response?.data)
        }

    },[])

    const {danhSachNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('danhSachNguoiDung', danhSachNguoiDung)
    console.log('danhSachNguoiDungmanguoidung', danhSachNguoiDung[0].maLoaiNguoiDung)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: danhSachNguoiDung[0].taiKhoan,
            matKhau:  danhSachNguoiDung[0].matKhau,
            email:  danhSachNguoiDung[0].email,
            soDt:  danhSachNguoiDung[0].soDt,
            hoTen:  danhSachNguoiDung[0].hoTen,
            maNhom: GROUP_ID,
            maLoaiNguoiDung: danhSachNguoiDung[0].maLoaiNguoiDung,
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
            soDt: Yup.number('Vui l??ng mh???p s???'),
            email: Yup.string().email('Kh??ng ????ng ?????nh d???ng email'),
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
            <a onClick={()=>{
                history.goBack();
            }}><i class='bx bx-left-arrow-alt'></i> Tr??? v???</a>
        <div className="container">
            <Form {...layout} onSubmitCapture={formik.handleSubmit} name="nest-messages">
                <Form.Item label="T??i kho???n">
                    <Input name="taiKhoan" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (<div className="alert alert-danger">{formik.errors.taiKhoan}</div>) : null} 
                </Form.Item>
                <Form.Item label="M???t kh???u">
                    <Input name="matKhau" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} />
                    {formik.errors.matKhau && formik.touched.matKhau ? (<div className="alert alert-danger">{formik.errors.matKhau}</div>) : null} 
                </Form.Item>
                <Form.Item label="H??? v?? t??n">
                    <Input name="hoTen" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} />
                    {formik.errors.hoTen && formik.touched.hoTen ? (<div className="alert alert-danger">{formik.errors.hoTen}</div>) : null} 
                </Form.Item>
                <Form.Item label="S??? ??i???n tho???i">
                    <Input name="soDt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soDt} />
                    {formik.errors.soDt && formik.touched.soDt ? (<div className="alert alert-danger">{formik.errors.soDt}</div>) : null} 
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger">{formik.errors.email}</div>) : null} 
                </Form.Item>
                <Form.Item label="Lo???i ng?????i d??ng">
                    <Select
                         placeholder="ch???n lo???i ng?????i d??ng" onChange={handleChangeLoaiNguoiDung} options={state.maLoaiNguoiDungAPI.map((loai,index)=>({label: loai.tenLoai, value: loai.maLoaiNguoiDung}))}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    C???p nh???t
                    </Button>
                    
                </Form.Item>
                <Prompt when={promt.status} message={(location)=>{
                    return 'b???n c?? mu???n r???i ??i'
                }}></Prompt>
            </Form>
        </div>
        </div>
    )
}
