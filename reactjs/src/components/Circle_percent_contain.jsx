import React from 'react'
import '../css/style-circle-percent.css'
import {HiOutlineDesktopComputer} from 'react-icons/hi';
import NotePercent from '../components/Note_percent'
import  {VscCircleFilled} from 'react-icons/vsc'
import Doughnut from './doughnut'

const Circle_percent_contain = () => {
    const notInput1 =[
        {
            key:1,
            icon: <VscCircleFilled className="icon-note coldevice1"/>, 
            nameNote: 'Đang hoạt động', 
            numberNote: <label className="number-note col1">3.799</label>
        },
        {
            key:2,
            icon: <VscCircleFilled className="icon-note coldevice2"/>, 
            nameNote: 'Ngưng hoạt động', 
            numberNote: <label className="number-note col1">422</label>
        }
    ]
  return (
    <div className="circle-percent-content">
        <div className="circle-percent1">
            <Doughnut />
        </div>
        <div className="circle-percent2">
            <Doughnut />
        </div>
        <div className="percent-title"> 
            <label className="number-total">4.222</label>
            <div className="name-service"><HiOutlineDesktopComputer className='icon-service'/>Thiết bị</div>
        </div>
        <div className="percent-note">
            {
                notInput1.map((data)=>(
                    <NotePercent contain={data} key={data.key}/>
                ))
            }
        </div>
    </div>
  )
}

export default Circle_percent_contain