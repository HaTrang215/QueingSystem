/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-const-assign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from 'react'
// import { useNavigate } from "react-router-dom";
import '../css/style-main.css'
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import axios from "axios";
import {FaPenSquare} from 'react-icons/fa'
import Select from '../components/Select';
import Input from '../components/Input';
import { FiSearch} from 'react-icons/fi';
import Pagination from '../components/Pagination';
import Posts from "../components/Post_detail_service"
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
import { useNavigate,useParams } from "react-router-dom";
import CalendarPicker from "../components/Mutiple_Calendar"
import moment from "moment"

const service_detail = (props) => {
  // const Navigate = useNavigate();
  const groupFunction = 'service'
  //phân quyền
  const Navigate = useNavigate();
  const url = '/'+groupFunction
  const {id} = useParams()
  const id_user = localStorage.getItem('id_user')
  // const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState('')
  const [data, setData] = useState([]);
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=8;
  const [totalRow, setTotalRow] = useState(1);

  const [begindate, setBegindate] = useState(moment().subtract(1,"day").format("YYYY-MM-DD"))
  const [enddate, setEnddate]= useState(moment().format("YYYY-MM-DD"))
  // const [service, setService] = useState([]);
  useEffect(()=>{
    const data={
      id: id_user,
      group: groupFunction,
    }
    axios.post('/api/auth', data)
      .then(res =>{
          if(res.data.status === 200){
            const total = (res.data.total).toString();
            const count = (res.data.count).toString();
            const min = (res.data.min).toString();
            const auth = total+count+min
            setAuth(auth);
          }
      });
    
    const id_service=id
    // console.log(id_equipment)
    axios.get(`/api/detail-service/${id_service}`)
    .then(res =>{
        if(res.data.status === 200){
          setData({
            id_service:res.data.service[0].id_service,
            service_name:res.data.service[0].service_name,
            describe:res.data.service[0].describe,
            auto_increate:res.data.service[0].auto_increate,
            start:res.data.service[0].start,
            end:res.data.service[0].end,
            prefix:res.data.service[0].prefix,
            surfix:res.data.service[0].surfix,
            reset_daily:res.data.service[0].reset_daily,
          })
          setBegindate(res.data.mindate)
          setPosts(res.data.number)
          setTotalRow(res.data.count)
        }
  });
  },[]);
  const [selected1, setSelected1] = useState({value: 'all', label: 'Tất cả'})
  const options1 = [
    { value: 1, label: 'Đang chờ' },
    { value: 2, label: 'Đã sử dụng'},
    { value: 0, label: 'Bỏ qua'}
  ]

  const [values, setValues]= useState({
    searchContent: ''
})

const inputs = [
    {
        id: 1,
        name: "searchContent",
        type: "text",
        placeholder: "Nhập từ khoá",
        label: "Từ khoá",
        required: false,
        icon: <FiSearch />
    }
]

const onChange = (e) =>{
  setValues({...values, [e.target.name]: e.target.value})
}
  const filterActive = ()=>{
    if(values.searchContent===''){
      if (selected1.value==='all'){
        const filterActive = posts.filter(
          (p)=>  p.start_date >= begindate && p.start_date<= enddate
        );
        return (filterActive)
      }else{
        const filterActive = posts.filter(
          (p)=> p.status_active === selected1.value && p.start_date >= begindate && p.start_date<= enddate
        );
        return (filterActive)
      }
    }else{
      const filterActive = posts.filter(
        (p)=> p.create_date >= begindate && p.create_date<= enddate && 
              (p.id_service.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.service_name.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1)
      );
      return (filterActive);
    }
   
  }
var filterData= useMemo(filterActive, [selected1,begindate, enddate, values.searchContent, posts])

function onPageChange (newPage){
  setCurrPage(newPage);
}
// console.log(filterData)
const endPost = currPage*postPerPage;
const firstPost = endPost - postPerPage;
const currPosts = filterData.slice(firstPost,endPost);
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Dịch vụ' title2='Danh sách dịch vụ' title3='Chi tiết'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý dịch vụ</label>
            </div>
            <div className="background-content3">
                <div className="col-item13">
                <div className="row-item9">
                  <label className='tittle'>Thông tin dịch vụ</label>
                </div>
                <div className="row-item10">
                    <div className="col-item10">
                        <div className="item1">
                        <label className="add-title1">Mã dịch vụ:</label>
                        <label className="add-content">{data.id_service}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title1">Tên dịch vụ:</label>
                        <label className="add-content">{data.service_name}</label>
                    </div>
                    <div className="item1">
                        <label className="add-title1">Mô tả:</label>
                        <label className="add-content">{data.describe}</label>
                    </div>
                </div>                
                </div>
                <div className="row-item9">
                  <label className='tittle'>Quy tắc cấp số</label>
                </div>
                {
                      (data.auto_increate===1)?
                      (<div className="row-item12">
                      <div className="content-checkbox">
                          <label className="title-checkbox">Tăng tự động:</label>
                          <input 
                            type="text" 
                            className="number-checkbox" 
                            placeholder={data.start}
                            name="start"
                            disabled
                          />
                          <label className="title-checkbox">đến</label>
                          <input 
                            type="text" 
                            className="number-checkbox" 
                            placeholder={data.end}
                            name="end"
                            disabled
                            />
                      </div>
                    </div>):''
                }
                {
                  (data.prefix!==0)?
                  (<div className="row-item12">
                  <div className="content-checkbox">
                      <label className="title-checkbox">Prefix:</label>
                      <input 
                        type="text" 
                        className="number-checkbox" 
                        placeholder={data.prefix}
                        name="prefix"
                        disabled
                        />
                  </div>
              </div>):''
                }
                {
                  (data.surfix!==0)?
                  (<div className="row-item12">
                  <div className="content-checkbox">
                    <label className="title-checkbox">Surfix:</label>
                    <input 
                      type="text" 
                      className="number-checkbox" 
                      placeholder={data.surfix}
                      name="surfix"
                      disabled
                      />
                  </div>
              </div>):""
                }
                {
                  (data.reset_daily===1)?
                  (<div className="row-item12">
                  <div className="content-checkbox">
                      <label className="title-checkbox">Reset mỗi ngày</label>
                  </div>
                </div>):''
                }
                <div className="row-item12">
                    <label className="title-checkbox1">Ví dụ: 201-2001</label>
                </div>
              </div>
              <div className="col-item14">
              <div className="row-item1">
              <div className='row-item1-1'>
                <div className="col-item15">
                  <Select 
                  selected={selected1} 
                  setSelected={setSelected1} 
                  options={options1}
                  title={"Trạng thái"}
                  onClick 
                  />
                </div>
                <div className="col-item16">
                  <CalendarPicker begindate={begindate} setBegindate={setBegindate} enddate={enddate} setEnddate={setEnddate}></CalendarPicker>
                </div>
              </div>
              <div className="col-item17">
              {inputs.map((input) =>(
                      <Input
                          key={input.id}
                          {...input} 
                          value={values[input.name]}
                          onChange= {onChange}
                      />
                  ))}
              </div>
            </div>
            <div className="row-item1">
              <div className="content-table1">
              <table>
            <thead>
                <tr>
                    <th >Số  thứ tự</th>
                    <th >Trạng thái</th>
                </tr>
            </thead>
                <Posts posts={currPosts}/>
        </table>
              </div>
            </div>
            <div className="row-item1">
                <Pagination currPage={currPage} limit={postPerPage} totalRow={totalRow} onPageChange={onPageChange}/>
            </div>
              </div>
            </div>
            <div className="box-btn">
                <div 
                    className={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? "button-add2": "button-add-block1"}
                    onClick={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? ()=>Navigate(`${url}/update/${data.id_service}`): ()=>''}>
                    <label className='btn-title'><FaPenSquare className='icon-button'/><br/>Cập nhật danh sách</label>
                </div>
                <div 
                    className="button-add2"
                    onClick={ ()=>Navigate('/service')}>
                    <label><BsFillArrowLeftSquareFill className='icon-button'/><br/>Quay lại</label>
                </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default service_detail