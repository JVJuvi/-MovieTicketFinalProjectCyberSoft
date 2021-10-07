import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAcTion';
import { GROUP_ID } from '../../../../util/setting';

export default function AddNew(props) {

    const [imgSRC, setImgSRC] = useState('');

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUP_ID
        },
        onSubmit: (values) => {
            console.log('values',values)

            //vì lấy values tren formik nên sẽ ko có maNhom nên thêm nó vào values
            values.maNhom = GROUP_ID

            //tạo đối tượng formdata =>  Đưa giá trị values từ formik vào formData;
            let formData = new FormData();
            for (let key in values) {
                if(key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }

            // gọi api đưa lên server
            dispatch(themPhimUploadHinhAction(formData))
        }
    })


    // chỉnh định dạng của ngày và thêm vào initialValues
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        console.log('date', ngayKhoiChieu);
        formik.setFieldValue('ngayKhoiChieu',ngayKhoiChieu);
    }

    // gán giá trị value của switch vào name rồi gắn name vào initialValues thông qua setFieldValue
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    // file hinh ảnh
    const handleChangeUploadFile = (event) => {
        //file ảnh bên trong là 1 formdata 1 object
        // mỗi lần chỉ lấy 1 file
        let file = event.target.files[0];
        console.log('file', file);

        if(file.type === 'image/png' || file.type === 'image/jpeg') {
            //tạo đối tượng để đọc file
            let reader = new FileReader();
            //đọc file và trả ra url
            reader.readAsDataURL(file);
            // dùng onload để bắt url đó rồi gán url đó vào state
            reader.onload = (e) => {
            //url vừa lấy được là 1 định dạng base 64 
            setImgSRC(e.target.result)
            }
        }
        formik.setFieldValue('hinhAnh', file)

    }

    // gán giá trị value của số sao vào initialValues
    const handleChangeNumber = (value) => {
        formik.setFieldValue('danhGia', value)
    }

    return (
        <div>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                >    
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange}/>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange}/>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange}/>
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}/>
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')}/>
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')}/>
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')}/>
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeNumber} min={1} max={10}/>
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeUploadFile} accept="image/png, image/jpeg" />
                    <br />
                    <img src={imgSRC} alt="..." style={{width: 150, height: 200}} />
                </Form.Item>
                <Form.Item label="Hành động">
                    <button type="submit" className="bg-green-500 rounded-sm text-white" style={{width: '300px', height: '50px'}}>Thêm phim</button>
                </Form.Item>
            </Form>
        </div>
    )
}
