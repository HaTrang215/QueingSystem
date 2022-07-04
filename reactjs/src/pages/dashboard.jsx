/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect } from 'react'
import '../css/style-main.css'
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import {BsCalendar, BsCalendarCheck, BsBookmarkStar} from 'react-icons/bs';
import {MdOutlineContactPhone} from 'react-icons/md'
import BoxNumber from '../components/Box_number';
import SelectDropdown from '../components/select_dashboard'
import LineChart from '../components/LineChart';
// import CirclePercent from '../components/Circle_percent_contain'
import axios from "axios";


const dashboard = () => {
  const [equipment, setEquipmqent]=useState([])
  const [service, setService]=useState([])
  const [number, setNumber]=useState([])

  useEffect(()=>{
    axios.get('/api/list-equipment')
    .then(res =>{
      if(res.data.status === 200){
        setEquipmqent(res.data.equipment);
        setService(res.data.service);
        setNumber(res.data.number)
      }  
    }); 
  },[]);

  const inputs=[
    {
      id: 1,
      IconBox: <div className="box-icon1"><BsCalendar className='icon-number1'/></div>,
      NameBox: 'Số thứ tự đã cấp',
      TotalNumber: '4.221 ',
      PercentNumber: 32.41,
    },
    {
      id: 2,
      IconBox: <div className="box-icon2"><BsCalendarCheck className='icon-number2'/></div>,
      NameBox: 'Số thứ tự đang sử dụng',
      TotalNumber: '4.221',
      PercentNumber: -32.41,
    },
    {
      id: 3,
      IconBox: <div className="box-icon3"><MdOutlineContactPhone className='icon-number3'/></div>,
      NameBox: 'Số thứ tự đang chờ',
      className: 'icon-number3',
      TotalNumber: '4.221 ',
      PercentNumber: 32.41,
    },
    {
      id: 4,
      IconBox: <div className="box-icon4"><BsBookmarkStar size={28} className='icon-number4'/></div>,
      NameBox: 'Số thứ tự đã bỏ qua',
      className: 'icon-number4',
      TotalNumber: '4.221 ',
      PercentNumber: -32.41,
    }
  ]
  
  const [selected, setSelected] = useState({value: '1', label: 'Ngày'});
  const options = [
    { value: '1', label: 'Ngày' },
    { value: '2', label: 'Tuần' },
    { value: '3', label: 'Tháng' }
  ]

  const datas = [
    {
      x: 'tuần 1',
      y: 1298,
    },
    {
      x: 'tuần 2',
      y: 998,
    },
    {
      x: 'tuần 3',
      y: 1998,
    },
  ]
  return (
    <div className="container">
      <GroupNavbar content='dashboard'/>
      <div className="content">
        <Topbar title1='' title2='' title3='Dashboard'/>
        <div className="main">
          <div className="wrap-chart">
          <div className="row-item1">
            <label className='name-page'>Biểu đồ cấp số</label>
          </div>
          <div className="row-item1">
            {inputs.map((input) =>(
              <BoxNumber 
                  key={input.id} 
                  {...input} 
              />
            ))}
          </div>
          <div className="row-item1">
            <div className="chart-container">
              <div className="row-item3">
                <div className="col-item1">
                  <label className="title-chart">Bảng thống kê theo tuần</label>
                  <label className="time-chart">Tháng 11/2021</label>
                </div>
                <div className="col-item2">
                  <label className="select-chart">Xem theo</label>
                  <div className="select-container">
                    <SelectDropdown selected={selected} setSelected={setSelected} keys={options.key} options={options}/>
                  </div>
                </div>
              </div>
              <div className="row-item3">
                <div className="chart-content">
                  <LineChart datas={datas}/>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="circle-percent-container">
            <div className="row-item4">
            <label className='name-page'>Tổng quan</label>
            </div>
            {/* <CirclePercent
              equipment={equipment}
              service={service}
              number={number}
            /> */}
        </div>
      </div>
    </div>
  )
}

export default dashboard