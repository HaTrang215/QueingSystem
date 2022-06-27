/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import '../css/style-login.css';
import Input1 from '../components/Input_login';
import Panel from '../assets/images/Quên mật khẩu.png';
import Logo from '../assets/images/Logo-alta-l.png';
import { ExclamationCircle} from 'react-bootstrap-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const forget_password2 = () => {

    const history  = useNavigate();
    const [values, setValue]= useState({
        password: "",
        confirmpassword: ""
    })

    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Nhập mật khẩu",
            label: "Mật khẩu "
        },
        {
            id: 2,
            name: "confirmpassword",
            type: "password",
            placeholder: "Nhập lại mật khẩu",
            label: "Nhập lại mật khẩu "
        },
    ]

    const onChange = (e) =>{
        setValue({...values, [e.target.name]: e.target.value})
    }

    const id = localStorage.getItem('id_user')

    const [err, setErr] = useState('');

    const onSubmit = async(e) => {
        e.preventDefault();

        const data={
            id : id,
            password: values.password,
            confirmpassword: values.confirmpassword,
        }
        // console.log(data);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/resetpassword',data)
            .then(res =>{
                if(res.data.status === 200){
                    console.log('successful');
                    localStorage.removeItem("id_user");
                    history("/login");
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
              <div className='wrap-login'>
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
                    (err === '')? '': <label className='warning-alert' ><ExclamationCircle/>{err}</label>
                }  
              </div>
              </div>
              <div className="row-button">
                  <input 
                      type="submit" 
                      value="Xác nhận" 
                      className="btn-Login"
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

export default forget_password2