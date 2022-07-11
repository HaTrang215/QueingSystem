/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-const-assign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import axios from "axios";
// import {FaPenSquare} from 'react-icons/fa'
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
import { useNavigate,useParams } from "react-router-dom";

const serial_number_detail = (props) => {
  const groupFunction = 'serial-number'
  //phân quyền
  const Navigate = useNavigate();
  // const url = '/'+groupFunction
  const {id} = useParams();
  // const id_user = localStorage.getItem('id_user')
  // const [auth, setAuth] = useState('')
  const [data, setData] = useState([]);
  // const [service, setService] = useState([]);
  useEffect(()=>{
    
    const id_serial_number=id;
    // console.log(id)
    axios.get(`/api/detail-serial-number/${id_serial_number}`)
    .then(res =>{
        if(res.data.status === 200){
          // console.log(res.data.number);
          setData({
            patient_name:res.data.number[0].patient_name,
            service_name:res.data.number[0].service_name,
            number_supply:res.data.number[0].number_supply,
            startdate:res.data.number[0].startdate,
            expirydate:res.data.number[0].expirydate,
            starttime:res.data.number[0].starttime,
            expirytime:res.data.number[0].expirytime,
            equipment_name:res.data.number[0].equipment_name,
            status_active:res.data.number[0].status_active,
            patient_phone:res.data.number[0].patient_phone,
            patient_email:res.data.number[0].patient_email,
          })
        }
  });
  
  },[]);
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Cấp số' title2='Danh sách cấp số' title3='Chi tiết'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý cấp số</label>
            </div>
            <div className="background-content1">
                <div className="row-item5">
                  <label className='tittle'>Thông tin cấp số</label>
                </div>
                  <div className="row-item7">
                    <div className="col-item10">
                        <div className="item1">
                        <label className="add-title">Họ tên:</label>
                        <label className="add-content">{data.patient_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Tên dịch vụ:</label>
                        <label className="add-content">{data.service_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Số thứ tự:</label>
                        <label className="add-content">{data.number_supply}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Thời gian cấp số:</label>
                        <label className="add-content">{data.starttime} - {data.startdate}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Hạn sử dụng:</label>
                        <label className="add-content">{data.expirytime} - {data.expirydate}</label>
                    </div>
                </div>
                <div className="col-item10">
                    <div className="item1">
                        <label className="add-title">Nguồn cấp:</label>
                        <label className="add-content">{data.equipment_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Trạng thái:</label>
                        <label className="add-content">
                        {
                        (data.status_active === 0 )? 
                        (<label><div className="point p-red"></div>Bỏ qua</label>) :
                        (data.status_active === 1 )?
                        (<label><div className="point p-wait"></div>Đang chờ</label>):
                        (<label><div className="point p-used"></div>Đã sử dụng</label>)
                    }
                        </label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Số điện thoạn:</label>
                        <label className="add-content">{data.patient_phone}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Địa chỉ email:</label>
                        <label className="add-content">{data.patient_email}</label>
                    </div>
                </div>
                
            </div>
          </div>
      </div>
  </div>
  <div 
      className={"button-add1"}
      onClick={()=>Navigate('/serial-number')}>
      <label><BsFillArrowLeftSquareFill className='icon-button'/><br/>Quay lại</label>
  </div>
                          
        </div>
      </div>
    </div>
  )
}

export default serial_number_detail