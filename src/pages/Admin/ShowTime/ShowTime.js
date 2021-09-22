import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Cascader, DatePicker, Select } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';

export default function ShowTime(props) {

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    console.log('heThongRapChieu', state.heThongRapChieu)
    console.log('cumRapChieu', state.cumRapChieu)

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: 75000,
        },
        onSubmit: async (values) => {
            console.log('tao lich chieu', values)
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);
                console.log('result', result.data.content)
                alert('Tạo lịch chiếu thành công')
            } catch(errors) {
                console.log('errors', errors.response?.data)
            }
        }
    })

    //lấy dữ liệu tên các hệ thống rạp
    useEffect( async ()=>{
        try {
            const result = await quanLyRapService.layThongTinHeThongRap();
            console.log('result', result.data)
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })

        } catch(errors) {
            console.log('errors', errors.response?.data)
        }
    },[])

    // sau khi có tên hệ thống rạp mỗi lần có hệ thống rạp nào thì sẽ xuất hiện cụm rạp như đó
    const handleChangeHeThongRap = async (value) => {
        console.log('hệ thống rạp', value)
        try {
            const result = await quanLyRapService.layThongTinCumRapTheoHeThong(value)
            console.log('result', result.data)
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch(errors) {
            console.log('errors',errors.response?.data)
        }
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const handleChangeGiaTien = (value) => {
        formik.setFieldValue('giaVe', value)
    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format("DD/MM/YYYY HH:mm:ss"))
    }
      
    const onOk = (values) => {
        console.log('onOk: ', values);
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format("DD/MM/YYYY HH:mm:ss"))
    } 

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    let film = {};
    if(localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'))
    }

    return (
        <div>
            <h3 className="text-3xl">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
                <img src={film.hinhAnh} />
                <Form {...layout} name="nest-messages" onSubmitCapture={formik.handleSubmit} >
                    <Form.Item label="Hệ thống rạp">
                        <Select placeholder="Nhập Hệ thống rạp" options={state.heThongRapChieu?.map((htr,index)=>({label: htr.tenHeThongRap, value: htr.maHeThongRap}))} onChange={handleChangeHeThongRap} /> 
                        {/* không có () trong handleChangeHeThongRap đẻ khi chọn giá trị trong input thì nó sẽ là giá trị mặc định values trong hằm  */}
                    </Form.Item>
                    <Form.Item label="Cụm rạp">
                        <Select placeholder="Nhập cụm rạp" options={state.cumRapChieu?.map((cumRap,index)=>({label: cumRap.tenCumRap, value:cumRap.maCumRap}))} onChange={handleChangeCumRap} />
                    </Form.Item>
                    <Form.Item label="Ngày, giờ chiếu">
                        <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime onChange={onChangeDate} onOk={onOk} placeholder="Chọn ngày giờ chiếu" />
                    </Form.Item>
                    <Form.Item label="Giá vé">
                        <InputNumber min={75000} max={150000} onChange={handleChangeGiaTien} />vnd
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                        Tạo lịch chiếu
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}
