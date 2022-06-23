import React from 'react';
import "../css/style-input.css";



const Input1 = (props) => {
    const {label, onChange, type, id,required, icon, notSubmit,...inputProps} = props;


  return (
    <div className="row-item-input">
        <label className='label-input'>{label}{((require)? <label className='require'>*</label>:'')}</label>
        <div className="wrap-input">
            <input
                className='input-file'
                type={ type}
                {...inputProps}
                onChange = {onChange}
            />
            <div className="icon-input">
                {icon}
            </div>
        </div>
    </div>
    
  )
}

export default Input1