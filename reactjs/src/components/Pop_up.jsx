import React from 'react'
import '../css/style-pop-up.css'
import {AiOutlineClose} from 'react-icons/ai'

const Pop_up = (props) => {
    const {setIsActive, data, service}=props
  return (
    <div className='wrap-pop-up'>
        <AiOutlineClose className='icon-close' onClick={()=>setIsActive(false)}/>
        <div className="row-popup1">
            <label className="title-popup">Số thứ tự được cấp</label>
            <label className="number-popup">{data[0].number_supply}</label>
            <div className="content-popup">
                <label className='service-popup'>DV: {service.label}</label>
                <label className='equipment-popup'>(tại {data[0].equipment_name})</label>
            </div>
        </div>
        <div className="row-popup2">
            <div className="content-time">
                <label className='title-time'>Thời gian cấp:</label>
                <label className='time-popup'>{data[0].starttime} {data[0].startdate}</label>
            </div>
            <div className="content-time">
                <label className='title-time'>Hạn sử dụng: </label>
                <label className='time-popup'>{data[0].expirytime} {data[0].expirydate}</label>
            </div>
        </div>
    </div>
  )
}

export default Pop_up