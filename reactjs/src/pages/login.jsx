/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import '../css/style-login.css';
import Input1 from '../components/Input1';
import Panel from '../assets/images/Đăng nhập.png';
import Logo from '../assets/images/Logo-alta-l.png';
import { ExclamationCircle} from 'react-bootstrap-icons';
import { Link} from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";


const login = () => {

    //const history = useNavigate();
    const [values, setValue]= useState({
        username: "",
        password: ""
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nhập tên đăng nhập",
            label: "Tên đăng nhập *"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Nhập mật khẩu",
            label: "Mật khẩu *"
        }
    ]

    const onChange = (e) =>{
        setValue({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        const data={
            username: values.username,
            password: values.password
        }

        axios.post('http://127.0.0.1:8000/api/login',data,)
        .then(res =>{
            console.log('Đăng nhập thành công')
        })
    }

  return (
    <div className="login-container">
        <div className="login-main">
            <img src={Logo} alt="" />
            <form method='POST' onSubmit={onSubmit}>
                {inputs.map((input) =>(
                    <Input1 
                        key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange= {onChange}
                    />
                ))}
                
                <div className="row-item">
                    <label className='warning-alert' ><ExclamationCircle/>Sai mật khẩu hoặc tên đăng nhập</label>
                    <label><Link to='/forget-password-1' className='link-before'>Quên mật khẩu?</Link></label>
                </div>
                <div className="row-button">
                    <input 
                        type="submit" 
                        value="Đăng nhập" 
                        className="btn-Login"
                    />   
                    <label><Link to='/forget-password-1' className='link-after'>Quên mật khẩu?</Link></label>  
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