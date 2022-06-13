import React, {useState} from 'react'
import '../css/style-login.css';
import Input1 from '../components/Input1';
import Panel from '../assets/images/Quên mật khẩu.png';
import Logo from '../assets/images/Logo-alta-l.png';
import { ExclamationCircle} from 'react-bootstrap-icons';
import { Link} from "react-router-dom";

const forget_password2 = () => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValue]= useState({
    password: "",
    
  })

  const inputs = [
      {
          id: 1,
          className: "username",
          type: "password",
          placeholder: "Nhập mật khẩu",
          label: "Mật khẩu "
      },
      {
        id: 2,
        className: "username",
        type: "password",
        placeholder: "Nhập lại mật khẩu",
        label: "Nhập lại mật khẩu "
    },
  ]

  const onChange = (e) =>{
      setValue({...values, [e.target.name]: e.target.value})
  }

  return (
  <div className="login-container">
      <div className="login-main">
          <img src={Logo} alt="" />
          <form action='/forget-password-2'>
          <div class="input-fiel">
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
                  <label className='warning-alert' ><ExclamationCircle/>Sai mật khẩu hoặc tên đăng nhập</label>
              </div>
              <div className="row-button">
                  <Link to="/login" className="btn-cancel">Huỷ</Link>
                  <input 
                      type="submit" 
                      value="Tiếp tục" 
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