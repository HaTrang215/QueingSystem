/* eslint-disable no-const-assign */
import React, {useState} from 'react'
import '../css/style-circle-percent.css'
import {HiOutlineDesktopComputer} from 'react-icons/hi';
import NotePercent from '../components/Note_percent'
import {FaCommentsDollar, FaBuffer} from 'react-icons/fa';
import Doughnut from './doughnut'
import Calendar from './Calender_picker';
import moment from "moment"


const Circle_percent_contain = () => {
    // const [equipment, service, number]=props

    // function point(number){
    //     const a = '';
    //     for (const i=0; i<number.lengh;i+1){
    //         if(i%3===0){
    //             a =a+'.'+number/10;
    //         }else{
    //             a =a+number/10;
    //         }
    //     }
    //     return value.clone().subtract(1, "month");
    //   }
    const equipmentInput =[
        {
            key:1,
            colorIcon: '#FFD130', 
            nameNote: 'Đang hoạt động', 
            colorNumber: '#FF7506',
            numberNote: 4.221
        },
        {
            key:2,
            colorIcon: '#7E7D88', 
            nameNote: 'Ngưng hoạt động', 
            colorNumber: '#FF7506',
            numberNote: 422
        }
    ]

    const equipment1 =
        {
            v1: 4221,
            c1: '#FF7506',
            v2: 422,

        }

    const equipment2 =
        {
            v1: 422,
            c1: '#7E7D88',
            v2: 4221,
        }
    
    //service
    const serviceInput =[
        {
            key:1,
            colorIcon: '#4277FF', 
            nameNote: 'Đang hoạt động', 
            colorNumber: '#4277FF',
            numberNote: 276
        },
        {
            key:2,
            colorIcon: '#7E7D88', 
            nameNote: 'Ngưng hoạt động', 
            colorNumber: '#4277FF',
            numberNote: 66
        }
    ]

    const service1 =
        {
            v1: 276,
            c1: '#4277FF',
            v2: 66,
        }

    const service2 =
        {
            v1: 66,
            c1: '#7E7D88',
            v2: 276
        }
    
    //number
    const numberInput =[
        {
            key:1,
            colorIcon: '#35C75A', 
            nameNote: 'Đang chờ', 
            colorNumber: '#35C75A',
            numberNote: 3.721
        },
        {
            key:2,
            colorIcon: '#7E7D88', 
            nameNote: 'Đã sử dụng', 
            colorNumber: '#35C75A',
            numberNote: 486
        },
        {
            key:3,
            colorIcon: '#F178B6', 
            nameNote: 'Bỏ qua', 
            colorNumber: '#35C75A',
            numberNote: 32
        }
    ]

    const number1 =
        {
            v1: 3721,
            c1: '#35C75A',
            v2: 486+32,

        }

    const number2 =
        {
            v1: 486,
            c1: '#7E7D88',
            v2: 3721+32,

        }

    const number3 =
    {
        v1: 32,
        c1: '#F178B6',
        v2: 3721+486,
    }

    //Get date calendar
    const [value , setValue]= useState(moment())
  return (
    <div>
        <div className="circle-percent-content">
            <div className="circle-container">
                <div className="circle-percent1">
                    <Doughnut value= {equipment1}/>
                </div>
                <div className="circle-percent2">
                    <Doughnut value= {equipment2}/>
                </div>
                <div className="number-circle">{Math.round((equipment1.v1/(equipment1.v2+equipment1.v1)) * 100)}%</div>
            </div>
            <div className="percent-title"> 
                <label className="number-total">4.222</label>
                <div className="name equipment-color"><HiOutlineDesktopComputer className='icon-service'/>Thiết bị</div>
            </div>
            <div className="percent-note">
                {
                    equipmentInput.map((data)=>(
                        <NotePercent contain={data} key={data.key}/>
                    ))
                }
            </div>
        </div>
        <div className="circle-percent-content">
            <div className="circle-container">
                <div className="circle-percent1">
                    <Doughnut value= {service1}/>
                </div>
                <div className="circle-percent2">
                    <Doughnut value= {service2}/>
                </div>
                <div className="number-circle">{Math.round((service1.v1/(service1.v2+service1.v1)) * 100)}%</div>
            </div>
            <div className="percent-title"> 
                <label className="number-total">4.222</label>
                <div className="name service-color"><FaCommentsDollar className='icon-service'/>Dịch vụ</div>
            </div>
            <div className="percent-note">
                {
                    serviceInput.map((data)=>(
                        <NotePercent contain={data} key={data.key}/>
                    ))
                }
            </div>
        </div>
        <div className="circle-percent-content">
            <div className="circle-container">
                <div className="circle-percent1">
                    <Doughnut value= {number1}/>
                </div>
                <div className="circle-percent2">
                    <Doughnut value= {number2}/>
                </div>
                <div className="circle-percent3">
                    <Doughnut value= {number3}/>
                </div>
                <div className="number-circle">{Math.round((number1.v1/(number1.v2+number1.v1)) * 100)}%</div>
            </div>
            <div className="percent-title"> 
                <label className="number-total">4.222</label>
                <div className="name number-color "><FaBuffer className='icon-service'/>Cấp số</div>
            </div>
            <div className="percent-note">
                {
                    numberInput.map((data)=>(
                        <NotePercent contain={data} key={data.key}/>
                    ))
                }
            </div>
        </div>
        <div className="calendar-container">
            <div className="calendar-content">
            <Calendar value= {value} setValue={setValue}/>
            </div>
        </div>
    </div>
  )
}

export default Circle_percent_contain