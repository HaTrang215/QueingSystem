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
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import axios from "axios";
// import {FaPenSquare} from 'react-icons/fa'
import Select from '../components/Select1';
import { useNavigate,useParams } from "react-router-dom";
import Popup from '../components/Pop_up'

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
  const [selected1, setSelected1] = useState({value: 'all', label: 'Chọn dịch vụ'})
  const [options1, setOptions1] = useState([])
  const [idEquipment, setIdEquipment] = useState()

  const [isActive, setIsActive]= useState(false);
  
  useEffect(()=>{
    
    axios.get(`/api/edit-add-number`)
    .then(res =>{
        if(res.data.status === 200){
          // console.log(res.data.id_equipment);
          setOptions1(res.data.service)
          setIdEquipment(res.data.id_equipment)
        }
  });
  
  },[]);

  const submitNumber = (e)=>{
    e.preventDefault();

    const data={
      service: selected1.value,
      equipment: idEquipment,
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/add-number-serial',data)
        .then(res =>{
            if(res.data.status === 200){
                setData(res.data.data)
                setIsActive(true);
            }else{
              alert(res.data.messenger)
            }
        })
    });
  }
  
  const cancelNumber = (e)=>{
    Navigate("/serial-number",{ replace: true });
  }
  
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Cấp số' title2='Danh sách cấp số' title3='Cấp số mới'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý cấp số</label>
            </div>
            <div className="background-content4">
              <div className="row-item13">
                <label className='label-number'>Cấp số mới</label>
              </div>
              <div className='row-item1-2'>
              <div className="col-item18">
                <Select 
                selected={selected1} 
                setSelected={setSelected1} 
                options={options1.map((o)=>({value:o.id_service, label:o.service_name}))}
                title={"Dịch vụ khách hàng lựa chọn"}
                onClick 
                />
              </div>
              </div>
              <div className="row-item13">
                <div className="add-button1">
                    <button className="btn-cancel-add" onClick={cancelNumber}>Huỷ bỏ</button>
                    <button className="btn-add" onClick={submitNumber}>In số</button>
                </div>
              </div>
            </div>
          </div>
        </div>                
        </div>
      </div>
      {
        (isActive && <Popup data={data} setIsActive={setIsActive} service={selected1}/>)
      }
    </div>
  )
}

export default serial_number_detail