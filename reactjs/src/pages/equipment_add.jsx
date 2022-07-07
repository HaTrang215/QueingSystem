/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-const-assign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useState, useEffect, useMemo } from 'react'
// import { useNavigate } from "react-router-dom";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import { FiSearch} from 'react-icons/fi';
import {FaStarOfLife} from 'react-icons/fa'
import axios from "axios";
import Select from '../components/Select_add';
import MultiSelect from '../components/Multiple_selected_add'
import { useNavigate } from "react-router-dom";

const equipment_add = () => {
  // const Navigate = useNavigate();
  const groupFunction = 'equipment'
  //phân quyền
  const id = localStorage.getItem('id_user')
  const history = useNavigate();
  useEffect(()=>{
    axios.get('/api/list-type-equipment')
  .then(res =>{
      if(res.data.status === 200){
        setType(res.data.type);
        setData(res.data.service);
      }
  });
  },[]);
const [equipmentInput, setEquipment] = useState({
  id_equipment:'',
  name_equipment:'',
  address_IP:'',
  username:'',
  password:''
})

const handleInput = (e) =>{
  e.persist();
  setEquipment({...equipmentInput, [e.target.name]: e.target.value})
}
const [data, setData] = useState([]);
const [type, setType] = useState([]);
function toString(selected){
  const data=[]
  selected.map((s)=> data.push(s.value) )
  const string= data.toString();
  return string;
}

const [selected1, setSelected1] = useState({value: 'all', label: 'Chọn loại thiết bị'})
const [selected, setSelected]= useState([])
// const [string, setstring]= useState('')
const [err, setErr] = useState('');
const [err1, setErr1] = useState('');

const submitEquipment = (e)=>{
  e.preventDefault();

  const data={
    id_equipment: equipmentInput.id_equipment,
    name_equipment: equipmentInput.name_equipment,
    address_IP: equipmentInput.address_IP,
    type: selected1.value,
    username: equipmentInput.username,
    password: equipmentInput.password,
    service: toString(selected),
    length: selected.length,
    id_user: id,
  }
  axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/add-equipment',data)
      .then(res =>{
          if(res.data.status === 200){
              console.log(res.data.status)
            history("/equipment",{ replace: true });
          }else if(res.data.status === 401){
            setErr1(res.data.messenger);
          }else{
            // console.log(res.data.status)
            setErr(res.data.messenger);
          }
      })
  });
}

const cancelEquipment = (e)=>{
  history("/equipment",{ replace: true });
}
console.log(toString(selected))
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Thiết bị' title2='Danh sách thiết bị' title3='Thêm thiết bị'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý thiết bị</label>
            </div>
            <div className="background-content">
              <div className="row-item5">
                <label className='tittle'>Thông tin thiết bị</label>
              </div>
              <div className="row-item5">
                <div className="col-item12">
                  <div className="item">
                    <label className="add-title">Mã thiết bị:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập mã thiết bị"
                      className='input-add'
                      name="id_equipment"
                      onChange={handleInput}
                      value={equipmentInput.id_equipment}/>                      
                  </div>
                  <div className="item">
                    <label className="add-title">Tên thiết bị:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập tên thiết bị"
                      className='input-add'
                      name="name_equipment"
                      onChange={handleInput}
                      value={equipmentInput.name_equipment}/>
                  </div>
                  <div className="item">
                    <label className="add-title">Địa chỉ Ip:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ Ip"
                      className='input-add'
                      name="address_IP"
                      onChange={handleInput}
                      value={equipmentInput.address_IP}/>
                  </div>
                  </div>
                <div className="col-item12">
                  <div className="item">
                    <label className="add-title">Loại thiết bị:<FaStarOfLife className='stress'/></label>
                    <Select
                      selected={selected1}
                      setSelected={setSelected1}
                      options={type.map((t)=>({value: t.id_type, label: t.type_name}))}
                      width={540}
                      />
                    </div>
                    <div className="item">
                      <label className="add-title">Tên đăng nhập: <FaStarOfLife className='stress'/></label>
                      <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        className='input-add'
                        name="username"
                        onChange={handleInput}
                        value={equipmentInput.username}/>
                    </div>
                    <div className="item">
                      <label className="add-title">Mật khẩu: <FaStarOfLife className='stress'/></label>
                      <input
                        type="text"
                        placeholder="Nhập mật khẩu"
                        className='input-add'
                        name="password"
                        onChange={handleInput}
                        value={equipmentInput.password}/>
                    </div>
                  </div>
                </div>
                  <div className="row-item6">
                      <label className="add-title">Dịch vụ sử dụng: <FaStarOfLife className='stress'/></label>
                      <MultiSelect data={data}
                          placeholder='Nhập dịch vụ sử dụng'
                          setSelected={setSelected}
                          selected={selected}/>
                  </div>
                  <div className="row-item5">
                  {
                        (err1 === '')? '': <label className="add-title">{err1}</label>
                      }
                    {
                      (err === '')? '': <label className="add-title"><FaStarOfLife className='stress'/>{err}</label>
                    }
                </div>
              </div>
              <div className="row-item1">
                <div className="add-button">
                    <button className="btn-cancel-add" onClick={cancelEquipment}>Huỷ bỏ</button>
                    <button className="btn-add" onClick={submitEquipment}>Thêm thiết bị</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default equipment_add