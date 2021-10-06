import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { themPhimUploadHinhAction, layChiTietPhimAction, capNhatPhimUploadAction } from '../../../../redux/actions/QuanLyPhimAcTion';
import { GROUP_ID } from '../../../../util/setting';

export default function Edit(props) {

    const [imgSRC, setImgSRC] = useState('');

    const dispatch = useDispatch();

    // tự động gọi api lên thông tin phim khi mở trang
    useEffect(()=>{
        dispatch(layChiTietPhimAction(props.match.params.id))
    },[])

    // sau khi đã có thông tin phim trên redux thì ta mang xuông gán vào giá trị từng input
    const {adminThongTinPhim} = useSelector(state => state.QuanLyPhimReducer);
    console.log('adminThongTinPhim', adminThongTinPhim)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: adminThongTinPhim.maPhim,
            tenPhim: adminThongTinPhim.tenPhim,
            trailer: adminThongTinPhim.trailer,
            moTa: adminThongTinPhim.moTa,
            ngayKhoiChieu: adminThongTinPhim.ngayKhoiChieu,
            dangChieu: adminThongTinPhim.dangChieu,
            sapChieu: adminThongTinPhim.sapChieu,
            hot: adminThongTinPhim.hot,
            danhGia: adminThongTinPhim.danhGia,
            hinhAnh: null,
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
                    if(values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            // gọi api
            dispatch(capNhatPhimUploadAction(formData))
            
        }
    })


    // chỉnh định dạng của ngày và thêm vào initialValues
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value);
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
    const handleChangeUploadFile = async (event) => {
        //file ảnh bên trong là 1 formdata 1 object
        // mỗi lần chỉ lấy 1 file
        let file = event.target.files[0];
        console.log('file', file);

        if(file.type === 'image/png' || file.type === 'image/jpeg') {
            //đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file)
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
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim}/>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer}/>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa}/>
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)}/>
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu}/>
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu}/>
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot}/>
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeNumber} min={1} max={10} value={formik.values.danhGia}/>
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeUploadFile} accept="image/png, image/jpeg" />
                    <br />
                    <img src={imgSRC === '' ? adminThongTinPhim.hinhAnh : imgSRC} alt="..." style={{width: 150, height: 200}} />
                </Form.Item>
                <Form.Item label="Hành động" className="text-center">
                    <button type="submit" className="bg-green-500 rounded-sm text-white" style={{width: '300px', height: '50px'}}>Cập nhật</button>
                </Form.Item>
            </Form>
        </div>
    )
}
