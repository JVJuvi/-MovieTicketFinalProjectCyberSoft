import React,{useState} from 'react'
import { Fragment } from 'react';
import { useFormik } from 'formik';
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
import { GROUP_ID, http } from '../../util/setting';
import moment from 'moment';

export default function AddFilm() {

    const [componentSize, setComponentSize] = useState('default');

    const [image, setImage] = useState({})

    const formik = useFormik({
        initialValues: {
            maPhim:'',
            tenPhim:'',
            trailer:'',
            moTa:'',
            maNhom:GROUP_ID,
            ngayKhoiChieu:'',
            sapChieu:false,
            dangChieu:false,
            hot:false,
            danhGia:0,
            hinhAnh:{}
        },
        onSubmit: (values) => {
            console.log('values', values)

            let formdata = new FormData();

            for (let key in values) {
                if(key !== 'hinhAnh') {
                    formdata.append(key, values[key]);
                }else {
                    formdata.append('file', values.hinhAnh, values.hinhAnh.name)
                }
            }
            http.post('/api/QuanLyPhim/ThemPhimUploadHinh', formdata).then(result => {
                console.log('result', result)
            }).catch(error => {
                console.log('error', error)
            })
        }
    })
    //ngay
    const handleChangeDatePicker = (date) => {
        const dateLocal = moment(date).format('DD/MM/YYYY');
        // dua du lieu vao formik
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }
    // switch
    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }
    //hinh anh
    const handleChangeFile = async (event) => {
        // lay file tu user
        let file = event.target.files[0];
        console.log(file)
        let reader = new FileReader();
        // doc file
        reader.readAsDataURL(file);
        //hay ham onload der thay doi hinh
        reader.onload = async (e) => {
            setImage(e.target.result)
        }
        // chay du lieu vao formik
        formik.setFieldValue('hinhAnh', file);
    }
      
    const onFormLayoutChange = ({ size }) => {
          setComponentSize(size);
    };
    
    return (
        <Fragment>
            <h1 className="text-center mb-5 text-2xl">Thêm phim</h1>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                span: 4,
                }}
                wrapperCol={{
                span: 14,
                }}
                layout="horizontal"
                initialValues={{
                size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>   

                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item> 

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker name="ngayKhoiChieu" format="DD/MM/YYYY" onChange={handleChangeDatePicker}  />
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={(checked) => {handleChangeSwitch('dangChieu', checked)}} />
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={(checked) => {handleChangeSwitch('dangChieu', checked)}}/>
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" name="hinhAnh" onChange={handleChangeFile} />
                    <img style={{width:200}} className="mt-2" src={image} alt="..." />
                </Form.Item>

                <Form.Item label="Xác nhận">
                    <button type="submit" className="rounded-sm p-1 bg-green-500 text-white">Thêm phim</button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}
