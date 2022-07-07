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
// import { FiSearch} from 'react-icons/fi';
import {FaStarOfLife} from 'react-icons/fa'
import axios from "axios";
import Select from '../components/Select_add';
import MultiSelect from '../components/Multiple_selected_add'
import { useNavigate,useParams } from "react-router-dom";
import { BsEyeSlash, BsEye} from 'react-icons/bs'

const account_management_update = () => {
  // const Navigate = useNavigate();
  const groupFunction = 'account-management'
  //phân quyền
  const history = useNavigate();
  const id_user = localStorage.getItem('id_user')
  const {id} = useParams()
  const [passwordEye1, setPasswordEye1] = useState(false);
    const handlePasswordClick1 = () =>{
        setPasswordEye1(!passwordEye1)
    }
  const [passwordEye2, setPasswordEye2] = useState(false);
  const handlePasswordClick2 = () =>{
      setPasswordEye2(!passwordEye2)
  }
  useEffect(()=>{
    axios.get('/api/list-role')
  .then(res =>{
      if(res.data.status === 200){
        setRole(res.data.role);
      }
  });

  const id_account=id
    // console.log(id_equipment)
    axios.get(`/api/edit-account/${id_account}`)
    .then(res =>{
        if(res.data.status === 200){
          setAccount({
            name:res.data.account[0].name,
            phone:res.data.account[0].phone,
            email:res.data.account[0].email,
            username:res.data.account[0].username,
            password:res.data.account[0].password,
            confirm_password:res.data.account[0].password
          })
          setSelected2({value: res.data.data[0].value, label: res.data.data[0].label})
          setSelected1({
            value:res.data.account[0].id_role,
            label:res.data.account[0].role_name,
          })
        }else{
          setErr(res.data.messenger);
          history("/account-management",{ replace: true });
        }
  });
  },[]);
const [accountInput, setAccount] = useState({
  name:'',
  phone:'',
  email:'',
  username:'',
  password:'',
  confirm_password:''
})

const handleInput = (e) =>{
  e.persist();
  setAccount({...accountInput, [e.target.name]: e.target.value})
}
// const [data, setData] = useState([]);
const [role, setRole] = useState([]);
function toString(selected){
  const data=[]
  selected.map((s)=> data.push(s.value) )
  const string= data.toString();
  return string;
}

const [selected1, setSelected1] = useState({value: 'all', label: 'Chọn vai trò'})
const [selected2, setSelected2] = useState({value: 'all', label: 'Tất cả'})
const options2 = [
  { value: 1, label: 'Hoạt động' },
  { value: 0, label: 'Ngưng hoạt động' }
]

const [err, setErr] = useState('');
const [err1, setErr1] = useState('');

const submitEquipment = (e)=>{
  e.preventDefault();

  const data={
    name: accountInput.name,
    phone: accountInput.phone,
    email: accountInput.email,
    role: selected1.value,
    username: accountInput.username,
    password: accountInput.password,
    confirm_password: accountInput.confirm_password,
    status_active: selected2.value,
    id:id,
    id_user: id_user,
  }
  axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/update-account',data)
      .then(res =>{
          if(res.data.status === 200){
              console.log(res.data.status)
            history("/account-management",{ replace: true });
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
  history("/account-management",{ replace: true });
}
// console.log(toString(selected))
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Cài đặt hệ thống' title2='Quản lý tài khoản' title3='Cập nhật tài khoản'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý tài khoản</label>
            </div>
            <div className="background-content">
              <div className="row-item5">
                <label className='tittle'>Thông tin tài khoản</label>
              </div>
              <div className="row-item5">
                <div className="col-item12">
                  <div className="item">
                    <label className="add-title">Họ và tên:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập họ tên"
                      className='input-add'
                      name="name"
                      onChange={handleInput}
                      value={accountInput.name}/>                      
                  </div>
                  <div className="item">
                    <label className="add-title">Số điện thoại:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className='input-add'
                      name="phone"
                      onChange={handleInput}
                      value={accountInput.phone}/>
                  </div>
                  <div className="item">
                    <label className="add-title">Email:<FaStarOfLife className='stress'/></label>
                    <input
                      type="text"
                      placeholder="Nhập email"
                      className='input-add'
                      name="email"
                      onChange={handleInput}
                      value={accountInput.email}/>
                  </div>
                  <div className="item">
                    <label className="add-title">Vai trò:<FaStarOfLife className='stress'/></label>
                    <Select
                      selected={selected1}
                      setSelected={setSelected1}
                      options={role.map((t)=>({value: t.id_role, label: t.role_name}))}
                      width={540}
                      />
                    </div>
                  </div>
                <div className="col-item12">
                    <div className="item">
                      <label className="add-title">Tên đăng nhập: <FaStarOfLife className='stress'/></label>
                      <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        className='input-add'
                        name="username"
                        onChange={handleInput}
                        value={accountInput.username}/>
                    </div>
                    <div className="item">
                      <label className="add-title">Mật khẩu: <FaStarOfLife className='stress'/></label>
                      <input
                        type={((passwordEye1 === false)? 'password' : 'text')}
                        placeholder="Nhập mật khẩu"
                        className='input-add'
                        name="password"
                        onChange={handleInput}
                        value={accountInput.password}/>
                        <div className="icon-eye1">
                    {
                        (passwordEye1 === false)? <BsEyeSlash onClick={handlePasswordClick1}/>: <BsEye onClick={handlePasswordClick1}/>
                    }
                </div>
                    </div>
                    <div className="item">
                      <label className="add-title">Nhập lại khẩu: <FaStarOfLife className='stress'/></label>
                      <input
                        type={((passwordEye2 === false)? 'password' : 'text')}
                        placeholder="Nhập lại mật khẩu"
                        className='input-add'
                        name="confirm_password"
                        onChange={handleInput}
                        value={accountInput.confirm_password}/>
                        <div className="icon-eye1">
                    {
                        (passwordEye2 === false)? <BsEyeSlash onClick={handlePasswordClick2}/>: <BsEye onClick={handlePasswordClick2}/>
                    }
                </div>
                    </div>
                    <div className="item">
                    <label className="add-title">Tình trạng:<FaStarOfLife className='stress'/></label>
                    <Select
                      selected={selected2}
                      setSelected={setSelected2}
                      options={options2}
                      width={540}
                      />
                    </div>
                  </div>
                </div>
                  <div className="row-item5">
                  {
                        (err1 === '')? '': <label className="error-title">{err1}</label>
                      }
                    {
                      (err === '')? '': <label className="error-title"><FaStarOfLife className='stress'/>{err}</label>
                    }
                </div>
              </div>
              <div className="row-item1">
                <div className="add-button">
                    <button className="btn-cancel-add" onClick={cancelEquipment}>Huỷ bỏ</button>
                    <button className="btn-add" onClick={submitEquipment}>Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default account_management_update