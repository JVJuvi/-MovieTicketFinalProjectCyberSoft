import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

export default function Films(props) {

    const{item} = props;

    return (
        
        <div className="group cursor-pointer transition-all duration-200 ease-in transform sm:hover:scale-105 ">
            <div className="mx-2 h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">                       
                <div style={{background: `url(${item.hinhAnh}) no-repeat`, backgroundPosition: 'center', backgroundSize: '100%'}}>
                    <img src={item.hinhAnh} alt={item.hinhAnh} className="opacity-0" style={{height: '200px'}} />
                </div>
                <h1 className="font-normal text-2xl text-gray-900 mb-3 transition-all duration-100 ease-in-out group-hover:font-bold">{item.tenPhim}</h1>
                <p className="leading-relaxed mb-3 max-w-md">{item.moTa.length > 100 ? <span>{item.moTa.slice(0,100)} ...</span> : <span>{item.moTa}</span>}</p>
                <a className="text-indigo-500 inline-flex items-center">Đặt vé
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                    </svg>
                </a>
                <div className="flex justify-center opacity-0 group-hover:opacity-100">
                    {item.ngayKhoiChieu}
                    <div className="flex items-center">
                        <LikeOutlined className="mx-2" style={{height: '14px'}} /> {item.danhGia}
                    </div>
                </div>
            </div>         
        </div>    
    )
}

