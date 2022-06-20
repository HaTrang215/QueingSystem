/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import '../css/style-login.css';
import Input1 from '../components/Input1';
import Panel from '../assets/images/Quên mật khẩu.png';
import Logo from '../assets/images/Logo-alta-l.png';
import { ExclamationCircle} from 'react-bootstrap-icons';
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const forget_password1 = () => {
    const history  = useNavigate();
    const [values, setValue]= useState({
        email: ""
    })

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "text",
            placeholder: "Nhập email",
            label: "Vui lòng nhập email để đặt lại mật khẩu của bạn *"
        },
    ]

    const onChange = (e) =>{
        setValue({...values, [e.target.name]: e.target.value})
    }
    
    const [err, setErr] = useState('');

    const onSubmit = async(e) => {
        e.preventDefault();

        const data={
            email: values.email,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/forgetpassword',data)
            .then(res =>{
                if(res.data.status === 200){
                    localStorage.setItem('id_user', res.data.id);
                    history("/forget-password-2",{ replace: true });
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
            <div className="input-fiel">
                <h2>Đặt lại mật khẩu</h2>
            </div>
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
                        (err === '')? '' : <label className='warning-alert' ><ExclamationCircle/>{err}</label>
                    }
                </div>
                <div className="row-button">
                    <Link to="/login" className="btn-cancel">Huỷ</Link>
                    <input 
                        type="submit" 
                        value="Tiếp tục" 
                        className="btn-Continue"
                    />   
                </div>
            </form>
        </div> 
        <div className="login-panel">
        <img src={Panel} alt="" />
        </div>       
    </div>
    )
}

export default forget_password1