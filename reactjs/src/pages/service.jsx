/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect, useMemo} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import Select from '../components/Select';
import Input from '../components/Input';
import { FiSearch} from 'react-icons/fi';
import {AiFillPlusSquare} from 'react-icons/ai'
import Pagination from '../components/Pagination';
import Posts from "../components/Post_service"
import CalendarPicker from "../components/Mutiple_Calendar"
import moment from "moment"


const service = () => {
  const Navigate = useNavigate();
  const groupFunction = 'service';
  const url = '/'+groupFunction;
  //phân quyền
  const id = localStorage.getItem('id_user')
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState('')
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=9;
  const [totalRow, setTotalRow] = useState(1);

  const [begindate, setBegindate] = useState(moment().subtract(1,"day").format("YYYY-MM-DD"))
  const [enddate, setEnddate]= useState(moment().format("YYYY-MM-DD"))
  

  useEffect(()=>{
    const data={
      id: id,
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
          }else {
              setLoading(false)
          }
      });
      axios.get('/api/list-service')
      .then(res =>{
          if(res.data.status === 200){
            setPosts(res.data.service);
            setTotalRow(res.data.count);
            setBegindate(res.data.mindate)
            const row = filterData.length;
            if (row > 0){
              setTotalRow(posts.length);
            }else{
              setTotalRow(1);
            }
          }
          setLoading(false)
      }); 
  },[]);

  const [selected1, setSelected1] = useState({value: 2, label: 'Tất cả'})
  const options1 = [
    { value: 2, label: 'Tất cả' },
    { value: 1, label: 'Hoạt động' },
    { value: 0, label: 'Ngưng hoạt động' }
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
      if (selected1.value===2){
        const filterActive = posts.filter(
          (p)=>  p.create_date >= begindate && p.create_date<= enddate
        );
        return (filterActive)
      }else{
        const filterActive = posts.filter(
          (p)=> p.status_active === selected1.value && p.create_date >= begindate && p.create_date<= enddate
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

const endPost = currPage*postPerPage;
const firstPost = endPost - postPerPage;
const currPosts = filterData.slice(firstPost,endPost);
  
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='' title2='Dịch vụ' title3='Danh sách dịch vụ'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Danh sách dịch vụ</label>
            </div>
            <div className="row-item1">
              <div className='row-item1-1'>
                <div className="col-item4">
                  <Select 
                  selected={selected1} 
                  setSelected={setSelected1} 
                  options={options1}
                  title={"Trạng thái hoạt động"}
                  onClick 
                  />
                </div>
                <div className="col-item6">
                  <CalendarPicker begindate={begindate} setBegindate={setBegindate} enddate={enddate} setEnddate={setEnddate}></CalendarPicker>
                </div>
              </div>
              <div className="col-item5">
              
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
              <div className="content-table">
                {(loading)? <h3>Đang tải....</h3>:
              <table>
            <thead>
                <tr>
                    <th >Mã dịch vụ</th>
                    <th >Tên dịch vụ</th>
                    <th >Mô tả</th>
                    <th >Trạng thái hoạt động</th>
                    <th ></th>
                    <th ></th> 
                </tr>
            </thead>
                <Posts posts={currPosts} auth={auth} />
        </table>}
              </div>
            </div>
            <div className="row-item1">
                <Pagination currPage={currPage} limit={postPerPage} totalRow={totalRow} onPageChange={onPageChange}/>
            </div>
          </div>
        </div>
        <div 
            className={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? "button-add": "button-add-block"}
            onClick={(auth === '111' || auth === '321' || auth === '421'|| auth === '631')? ()=>Navigate(url+'/add'): ()=>''}>
            <label><AiFillPlusSquare className='icon-button'/><br/>Thêm dịch vụ</label>
        </div>
        </div>
      </div>
    </div>
  )
}

export default service