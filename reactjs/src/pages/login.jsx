/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import '../css/style-login.css';
import Input1 from '../components/Input_login';
import Panel from '../assets/images/Đăng nhập.png';
import Logo from '../assets/images/Logo-alta-l.png';
import { ExclamationCircle} from 'react-bootstrap-icons';
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const login = () => {

    const history = useNavigate();
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

    const [err, setErr] = useState('');

    const onSubmit = async(e) => {
        e.preventDefault();

        const data={
            username: values.username,
            password: values.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login',data)
            .then(res =>{
                if(res.data.status === 200){
                    //console.log(res.data.object)
                    if(res.data.object === 0){
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.username);
                        history("/dashboard",{ replace: true });
                    }else{
                        if(res.data.type === 1){
                            history("/display-kios",{ replace: true });
                        }else if(res.data.type === 2){
                            history("/display-counter",{ replace: true });
                        }else if(res.data.type === 3){
                            history("/display-center",{ replace: true });
                        }else{
                            history("/user-interface",{ replace: true });
                        }
                    }
                }else if(res.data.status === 401){
                    setErr(res.data.messenger);
                }else{
                    setErr(res.data.messenger);
                }
            })
        });
    }

  return (
    <div className="login-container">
        <div className="login-main">
            <img src={Logo} alt="" />
            <form method='POST' onSubmit={onSubmit}>
                <div className="wrap-login">
                    {inputs.map((input) =>(
                        <Input1 
                            key={input.id} 
                            {...input} 
                            value={values[input.name]}
                            onChange= {onChange}
                        />
                    ))}
                    <div className="row-item">
                        {
                            (err === '')? <label><Link to='/forget-password-1' className='link-before'>Quên mật khẩu?</Link></label> : <label className='warning-alert' ><ExclamationCircle/>{err}</label>
                        }
                    </div>
                </div>
                <div className="row-button">
                    <input 
                        type="submit" 
                        value="Đăng nhập" 
                        className="btn-Login"
                    /> 
                </div>
                <div className="row-button">
                    {
                        (err === '')? '' : <label><Link to='/forget-password-1' className='link-after'>Quên mật khẩu?</Link></label>  
                    } 
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