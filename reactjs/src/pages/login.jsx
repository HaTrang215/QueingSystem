/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import '../css/style-login.css'
import Logo from '../assets/images/Logo-alta-l.png'
import Panel from '../assets/images/Đăng nhập.png'
import { ExclamationCircle} from 'react-bootstrap-icons';
import { BsEyeSlash, BsEye} from 'react-icons/bs'
import { Link} from "react-router-dom";
// import ForgetPassword1 from './forget-password1'
import AuthUser from '../components/AuthUser'



const login = () => {
    //handle Password
    const [passwordEye, setPasswordEye] = useState(false);
    const handlePasswordClick = () =>{
        setPasswordEye(!passwordEye)
    }

    //login
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {http, setToken} = AuthUser();
    const submitLogin = (e)=>{
        http.post('/login',{username:username, password:password}).then((res)=>{
            setToken(res.data.user,res.data.access_token);
        })
    }

  return (
    <div className="login-container">
        <div className="login-main">
            <img src={Logo} alt="" />
            <form >
                <div className="row-item">
                    <p>Tên đăng nhập *</p>
                    <input 
                        type="text" 
                        placeholder='lequynhaivan01' 
                        className="username"
                        onChange={e=>setUsername(e.target.value)}
                    />
                </div>
                <div className="row-item">
                    <p>Mật khẩu *</p>
                    <input 
                        type={(passwordEye === false)? 'password' : 'text'} 
                        placeholder='*********' 
                        className="password"
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <div className="icon-eye">
                    {
                        (passwordEye === false)? <BsEyeSlash onClick={handlePasswordClick}/>: <BsEye onClick={handlePasswordClick}/>
                    }
                    </div>
                </div>
                <div className="row-item">
                    <label className='warning-alert' ><ExclamationCircle/>Sai mật khẩu hoặc tên đăng nhập</label>
                    <label><Link to='/ForgetPassword' className='link-before'>Quên mật khẩu?</Link></label>
                </div>
                <div className="row-item">
                    <input 
                        type="submit" 
                        value="Đăng nhập" 
                        className="btn-Login"
                        onClick={submitLogin}
                    />
                    
                </div>
            </form>
        </div>
        <div className="login-panel">
            <img src={Panel} alt="" />
            <div className="word">
                <p className='systerm-word'>Hệ thống</p>
                <p className='manager-queing-word'>Quản lý xếp hàng</p>
            </div>
        </div>
        
    </div>
    )
}

export default login