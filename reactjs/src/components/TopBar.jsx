import React, {useState, useEffect} from 'react'
import '../css/style-topbar.css'
import {MdOutlineNavigateNext} from 'react-icons/md';
import {FaBell} from 'react-icons/fa'
import Avatar from '../assets/avatar/hình nền.png'
import NotificationBox from '../components/Notification_box'
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const TopBar = (props) => {

    const {title1, title2, title3}=props

    const [notice, setNotice] = useState(false);
    const handleBellClick = () =>{
        setNotice(!notice)
    }
    
    const [name, setName]=useState('')

    useEffect(()=>{
        const id = localStorage.getItem('id_user')
        const data={
            id: id,
          }
          axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/loaduser', data)
            .then(res =>{
                if(res.data.status === 200){
                    setName(res.data.user.name)
                }else {
                    console.log(res.data.messenger);
                }
            });
        });
    });

    const Navigate = useNavigate()
    const accoount = ()=>{ Navigate('/account')}
  return (
    <div className="top-bar">
        <div className="title-page">
            {
                (title1 === '')? '':<label className="name-page-b">{title1}</label>
            }
            {
                (title1 === '')? '':<MdOutlineNavigateNext className='icon-next'/>                
            }
            {
                (title2 === '')? '':<label className="name-page-b">{title2}</label>
            }
            {
                (title2 === '')? '':<MdOutlineNavigateNext className='icon-next'/>                
            }             
            <label className="name-page-f" >{title3}</label>
        </div>
        <OutsideClickHandler onOutsideClick={()=>setNotice(false)}>
        {
            (notice === false)? <FaBell className='icon-bell-b' onClick={handleBellClick}/>: <FaBell className='icon-bell-s'onClick={handleBellClick}/>
        }
        {
            (notice === false)? '': <NotificationBox/>
        }
        </OutsideClickHandler>
        <div className="infor-account">
            <img src={ Avatar} alt="avata" className="avatar"/>
            <div className="text-account" onClick={accoount}>
                <p className="greeting">Xin chào</p>
                <p className="name-user">{name}</p>
            </div>
        </div>
    </div>
  )
}

export default TopBar