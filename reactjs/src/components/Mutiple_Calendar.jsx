/* eslint-disable no-undef */
import React, { useState } from 'react'
import '../css/style-calendar-picker.css'
import {MdArrowRight} from 'react-icons/md'
import OutsideClickHandler from 'react-outside-click-handler';
import Calendar from '../components/Calendar_mutilple'
// import moment from "moment"


const Mutiple_Calendar = (props) => {
    const {begindate, setBegindate, enddate, setEnddate} =props
    
    const [calendar, setCalendar] = useState(false);
    
  return (
    <div>
        <label className="select-title">Chọn thời gian</label>
        <OutsideClickHandler onOutsideClick={()=>setCalendar(false)}>
        <div className="calendar-picker" onClick={()=>setCalendar(!calendar)}>
            <input 
                type="date"
                name='begindate'
                value={begindate}
                onChange={(e)=>setBegindate(begindate)}/>
            <MdArrowRight className='icon-calendar'/>
            <input 
                type="date"
                name='enddate'
                value={enddate}
                onChange={(e)=>setEnddate(enddate)}/>
            </div>
            <div className="wrap-calendar">
            {
                (calendar === true)? <Calendar begindate={begindate} setBegindate={setBegindate} enddate={enddate} setEnddate={setEnddate}/>: ''
            }
            </div>
            
        </OutsideClickHandler>
    </div>
  )
}

export default Mutiple_Calendar