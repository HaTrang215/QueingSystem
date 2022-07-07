/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect,useRef } from 'react'
import '../css/style-main.css'
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import axios from "axios";
import Avatar from '../assets/avatar/hình nền.png'
import {FiCamera} from 'react-icons/fi'

const account = () => {
  const [account, setAccount]=useState([])
  const id = localStorage.getItem('id_user')
  useEffect(()=>{
    const data={
      id: id
    }
    axios.post('/api/account',data)
    .then(res =>{
        if(res.data.status === 200){
          setAccount(res.data.account);
          // console.log(res.data.account);
        }else{
          console.log(res.data.messenger);
        }

    }); 
  },[]);

  const [preview, setPreview] = useState();
  const selected=useRef();
          console.log(preview)

  const imgSelectHandle=(e)=>{
    setPreview(e.target.files[0])
    const formData = new FormData();
    formData.append('image', preview);
    formData.append('id', id);

    axios.post('/api/upload-image', formData)
      .then(res =>{
          if(res.data.status === 200){
            // console.log(res.data.messenger)
            setPreview(res.data.account)
          }else {
            console.log(res.data.messenger)
          }
      });
  }

  const uploadFile=()=>{
    document.getElementById('selectFile').click()
  }
  return (
    <div className="container">
      <GroupNavbar content=''/>
      <div className="content">
        <Topbar title1='' title2='' title3='Thông tin cá nhân'/>
        <div className="panel-account">
          <div className="col-item-1">
              {/* <img src={`http://localhost:8000/${account.avatar}`} className="img-avarta" alt=''/> */}
              <img src={Avatar} className="img-avarta" alt=''/>
              <input id="selectFile" type="file" name="image" style={{display: "none"}} onChange={imgSelectHandle} ref={selected}/>
              <FiCamera className='btn-upload-photo' onClick={uploadFile}/>
              <div className="name-avatar"><p>{account.name}</p></div>
          </div>
          <div className="col-item-2">
              <div className="row-item">
                  <p>Tên người dùng</p>
                  <input type="text" placeholder={account.name} disabled />
              </div>
              <div className="row-item">
                  <p>Số điện thoại</p>
                  <input type="text" placeholder={account.phone} disabled/>
              </div>
              <div className="row-item">
                  <p>Email:</p>
                  <input type="text" placeholder={account.email} disabled/>
              </div>
          </div>
          <div className="col-item-2">
              <div className="row-item">
                  <p>Tên đăng nhập</p>
                  <input type="text" placeholder={account.username} disabled />
              </div>
              <div className="row-item">
                  <p>Mật khẩu</p>
                  <input type="text" placeholder={account.password} disabled />
              </div>
              <div className="row-item">
                  <p>Vai trò</p>
                  <input type="text" placeholder={account.role_name} disabled />
              </div>
          </div>
            </div>
      </div>
    </div>
  )
}

export default account