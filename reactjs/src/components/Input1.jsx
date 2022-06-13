import React, {useState} from 'react';
import "../css/style-login.css";
import { BsEyeSlash, BsEye} from 'react-icons/bs'

const Input1 = (props) => {
    const {label, onChange, type, id, ...inputProps} = props;
    const [passwordEye, setPasswordEye] = useState(false);
    const handlePasswordClick = () =>{
        setPasswordEye(!passwordEye)
    }

  return (
    <div className="row-item">
        <p>{label}</p>
        <input
            type={(type === 'password')? ((passwordEye === false)? 'password' : 'text') : type}
            {...inputProps}
            onChange = {onChange}
        />
        {
            (type === 'password')?
            (
                <div className="icon-eye">
                    {
                        (passwordEye === false)? <BsEyeSlash onClick={handlePasswordClick}/>: <BsEye onClick={handlePasswordClick}/>
                    }
                </div>
            ):
            (
                <div className="icon-eye">
                </div>
            )
        }
    </div>
    
  )
}

export default Input1