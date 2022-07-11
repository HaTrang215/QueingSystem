import React, {useState} from 'react';
import '../css/style-navbar.css'
import Logo from '../assets/images/Logo-alta-s.png';
import { useNavigate } from "react-router-dom";
import { BsColumnsGap} from 'react-icons/bs';
import {HiOutlineDesktopComputer} from 'react-icons/hi';
import {FaCommentsDollar, FaBuffer, FaEllipsisV} from 'react-icons/fa';
import {RiFileChartLine, RiSettingsLine} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi'
import axios from "axios";
// import SubMenu from '../components/Sub_menu'
import OutsideClickHandler from 'react-outside-click-handler';


const GroupNavbar = (props) => {
    const [subar, setSubar] = useState(false);
    const {content} =props;
    const Navigate = useNavigate();
    const dashboard = ()=>{ Navigate('/dashboard')}
    const equipment = ()=>{ Navigate('/equipment')}
    const service = ()=>{ Navigate('/service')}
    const number = ()=>{ Navigate('/serial-number')}
    const report = ()=>{ Navigate('/report')}
    const management1 = ()=>{ Navigate('/role-management')}
    const management2 = ()=>{ Navigate('/account-management')}
    const diary = ()=>{ Navigate('/diary')}
    const id = localStorage.getItem('id_user')


    const onClickLogout=(e)=>{
        const data={
            id: id
        }
        axios.post('/api/logout', data)
      .then(res =>{
          if(res.data.status === 200){
            localStorage.removeItem('id_user', id);
            localStorage.removeItem('auth_token', res.data.token);
            localStorage.removeItem('auth_name', res.data.username);
            localStorage.removeItem('id_equipment', res.data.id_equipment);
            Navigate("/login");
          }else {
          }
      });
    }
    
  return (
    
    <div className="menu-bar">
        <img src={Logo} className="logo" alt=''/>
        <div className="menu-bar-content">
            <button 
                className={(content === 'dashboard')? 'active' : 'menu-item'}
                onClick={dashboard}
                >
                <BsColumnsGap className='icon'/>Dashboard
            </button>
            <button 
                className={(content === 'equipment')? 'active' : 'menu-item'}
                onClick={equipment}>
                <HiOutlineDesktopComputer className='icon'/>Thiết bị
            </button>
            <button 
                className={(content === 'service')? 'active' : 'menu-item'}
                onClick={service}>
                <FaCommentsDollar className='icon'/>Dịch vụ
            </button>
            <button 
                className={(content === 'serial-number')? 'active' : 'menu-item'}
                onClick={number}>
                <FaBuffer className='icon'/>Cấp số
            </button>
            <button 
                className={(content === 'report')? 'active' : 'menu-item'}
                onClick={report}>
                <RiFileChartLine className='icon'/>Báo cáo
            </button>
            <OutsideClickHandler onOutsideClick={()=>setSubar(false)}>
                <button 
                    className={(content === 'role-management'|| content === 'account-management'|| content === 'diary')? 'active' : 'menu-item'} 
                    onClick={()=>setSubar(!subar)}>
                    <RiSettingsLine className='icon'/>Cài đặt hệ thống<FaEllipsisV className='poin-dropdown'/>
                </button>
            
                {
                    (subar === false)? '' : 
                    (
                        <div className="sub-menu">
                            <button 
                            className={(content === 'role-management')? 'active up' : 'menu-item up'}
                            onClick={management1}>Quản lý vai trò</button>
                            <button 
                            className={(content === 'account-management')? 'active' : 'menu-item'}
                            onClick={management2}>Quản lý tài khoản</button>
                            <button 
                            className={(content === 'diary')? 'active down' : 'menu-item down'}
                            onClick={diary}>Nhật ký người dùng</button>
                        </div>
                    )
                }  
            </OutsideClickHandler>              
        </div>
        <div className="logout-content">
            <button className='btn-logout' onClick={onClickLogout}><FiLogOut className='icon'/>Đăng xuất</button>
        </div>
    </div>
  )
}

export default GroupNavbar