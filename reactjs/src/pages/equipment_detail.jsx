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
import {FaPenSquare} from 'react-icons/fa'
import { useNavigate,useParams } from "react-router-dom";

const equipment_detail = (props) => {
  // const Navigate = useNavigate();
  const groupFunction = 'equipment'
  //phân quyền
  const Navigate = useNavigate();
  const url = '/'+groupFunction
  const {id} = useParams()
  const id_user = localStorage.getItem('id_user')
  const [auth, setAuth] = useState('')
  const [data, setData] = useState([]);
  const [service, setService] = useState([]);
  useEffect(()=>{
    const data={
      id: id_user,
      group: groupFunction,
    }
    axios.post('/api/auth', data)
      .then(res =>{
          if(res.data.status === 200){
            const total = (res.data.total).toString();
            const count = (res.data.count).toString();
            const min = (res.data.min).toString();
            const auth = total+count+min
            setAuth(auth);
          }
      });
    
    const id_equipment=id
    // console.log(id_equipment)
    axios.get(`/api/detail-equipment/${id_equipment}`)
    .then(res =>{
        if(res.data.status === 200){
          setData({
            id_equipment:res.data.equipment[0].id_equipment,
            equipment_name:res.data.equipment[0].equipment_name,
            address_IP:res.data.equipment[0].address_IP,
            type_name:res.data.equipment[0].type_name,
            username:res.data.equipment[0].username,
            password:res.data.equipment[0].password
          })
          setService(res.data.service)
        }
  });
  
  },[]);
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Thiết bị' title2='Danh sách thiết bị' title3='Chi tiết thiết bị'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý thiết bị</label>
            </div>
            <div className="background-content1">
                <div className="row-item5">
                  <label className='tittle'>Thông tin thiết bị</label>
                </div>
                  <div className="row-item7">
                    <div className="col-item10">
                        <div className="item1">
                        <label className="add-title">Mã thiết bị:</label>
                        <label className="add-content">{data.id_equipment}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Tên thiết bị:</label>
                        <label className="add-content">{data.equipment_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Địa chỉ IP:</label>
                        <label className="add-content">{data.address_IP}</label>
                    </div>
                </div>
                <div className="col-item10">
                    <div className="item1">
                        <label className="add-title">Loại thiết bị:</label>
                        <label className="add-content">{data.type_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Tên đăng nhập:</label>
                        <label className="add-content">{data.username}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title">Mật khẩu:</label>
                        <label className="add-content">{data.password}</label>
                    </div>
                </div>
                
            </div>
            <div className="row-item8">
                <label className="add-title">Dịch vụ sử dung:</label>
                <label className="add-content">{service}</label>
            </div>
          </div>
      </div>
  </div>
  <div 
      className={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? "button-add1": "button-add-block"}
      onClick={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? ()=>Navigate(`${url}/update/${data.id_equipment}`): ()=>''}>
      <label><FaPenSquare className='icon-button'/><br/>Cập nhật thiết bị</label>
  </div>
                          
        </div>
      </div>
    </div>
  )
}

export default equipment_detail