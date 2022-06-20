import React from 'react'
import '../css/style-main.css'
// import {BsCalendar} from 'react-icons/bs';
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'

const Box_number = (props) => {
    const {IconBox,NameBox,TotalNumber,PercentNumber}=props;
    const Percent = -PercentNumber;
  return (
    <div className="box-container">
        <div className="row-item2">
            {IconBox}
            <div className="wrap-name">
                <label className="name-box">{NameBox}</label>
            </div>
        </div>
        <div className="row-item2">
            <div className="wrap-total">
                <label className="total-number">{TotalNumber}</label>
            </div>
            <div className="percent-number">
                {
                    (PercentNumber > 0)?
                        <label className="percent-up"><AiOutlineArrowUp className='arrow'/>{PercentNumber}%</label>
                    : 
                        <label className="percent-down"><AiOutlineArrowDown className='arrow'/>{Percent}%</label>
                }
            </div>
        </div>
    </div>
  )
}

export default Box_number