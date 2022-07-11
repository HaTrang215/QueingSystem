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
import Posts from "../components/Post_serial_number"
import CalendarPicker from "../components/Mutiple_Calendar"
import moment from "moment"

const serial_number = () => {
  const Navigate = useNavigate();
  const groupFunction = 'serial-number';
  const url = '/'+groupFunction;
  //phân quyền
  const id = localStorage.getItem('id_user')
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState('')
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=9;
  const [totalRow, setTotalRow] = useState(1);
  const [type,setType]=useState([]);
  const [service, setService]=useState([]);

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
      axios.get('/api/list-serial-number')
      .then(res =>{
          if(res.data.status === 200){
            setPosts(res.data.serial_number);
            setBegindate(res.data.min_date);
            setService(res.data.service);
            setType(res.data.type_equiment)
            setTotalRow(res.data.count);
            
          }
          setLoading(false)
      }); 
  },[]);
  const [selected1, setSelected1] = useState({value: 'all', label: 'Tất cả'})

  const [selected2, setSelected2] = useState({value: 'all', label: 'Tất cả'})
  const options2 = [
    { value: 0, label: 'Đang chờ' },
    { value: 1, label: 'Đã sử dụng'},
    { value: 2, label: 'Bỏ qua'}
  ]

  const [selected3, setSelected3] = useState({value: 'all', label: 'Tất cả'})

  

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
    if (values.searchContent===''){
      if (selected1.value === 'all' &&  selected2.value==='all' && selected3.value==='all'){
        const filterActive = posts.filter(
          (p)=> p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive)
      }else if(selected1.value !== 'all'&&  selected2.value==='all' && selected3.value==='all'){
        const filterActive = posts.filter(
          (p)=> p.service_name=== selected1.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }else if(selected1.value === 'all'&&  selected2.value!=='all' && selected3.value==='all'){
        const filterActive = posts.filter(
          (p)=> p.status_active === selected2.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }else if(selected1.value === 'all'&&  selected2.value==='all' && selected3.value!=='all'){
        const filterActive = posts.filter(
          (p)=> p.type_name_vi===selected3.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }else if(selected1.value !== 'all'&&  selected2.value!=='all' && selected3.value==='all'){
        const filterActive = posts.filter(
          (p)=> p.service_name=== selected1.value
                &&p.status_active === selected2.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }else if(selected1.value === 'all'&&  selected2.value!=='all' && selected3.value!=='all'){
        const filterActive = posts.filter(
          (p)=> p.status_active === selected2.value
                && p.type_name_vi===selected3.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }else if(selected1.value !== 'all'&&  selected2.value==='all' && selected3.value!=='all'){
        const filterActive = posts.filter(
          (p)=> p.service_name=== selected1.value
                && p.type_name_vi===selected3.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }
      else{
        const filterActive = posts.filter(
          (p)=> p.service_name=== selected1.value
                &&p.status_active === selected2.value
                && p.type_name_vi===selected3.value
                && p.start_date >= begindate 
                && p.start_date<= enddate
        );
        return (filterActive);
      }
      // return posts;
    }else{
      const filterActive = posts.filter(
        (p)=> p.start_date >= begindate && p.start_date<= enddate &&
              (p.patient_name.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.number_supply.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1)
      );
      return (filterActive);
    }
  }
var filterData= useMemo(filterActive, [selected1,selected2, selected3,begindate, enddate, values.searchContent,posts])

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
        <Topbar title1='' title2='Cấp số' title3='Danh sách cấp số'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý cấp số</label>
            </div>
            <div className="row-item1">
              <div className='row-item1-1'>
                <div className="col-item7">
                  <Select 
                  selected={selected1} 
                  setSelected={setSelected1} 
                  options={service.map((s)=>({value:s.service_name, label:s.service_name}))}
                  title={"Tên dịch vụ"}
                  onClick 
                  />
                </div>
                <div className="col-item7">
                  <Select 
                  selected={selected2} 
                  setSelected={setSelected2} 
                  options={options2}
                  title={"Tình trạng"}
                  onClick 
                  />
                </div>
                <div className="col-item7">
                  <Select 
                  selected={selected3} 
                  setSelected={setSelected3} 
                  options=
                  { 
                    type.map((t)=>({value: t.type_name_vi, label: t.type_name_vi}))
                  }
                  title={"Nguồn cấp"}
                  onClick 
                  />
                </div>
                
                <div className="col-item6">
                  <CalendarPicker begindate={begindate} setBegindate={setBegindate} enddate={enddate} setEnddate={setEnddate}></CalendarPicker>
                </div>
              </div>
              <div className="col-item8">
              
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
                    <th >STT</th>
                    <th >Tên khách hàng</th>
                    <th >Tên dịch vụ</th>
                    <th >Thời gian cấp</th>
                    <th >Hạn sử dụng</th>
                    <th >Trạng thái</th> 
                    <th >Nguồn cấp</th>
                    <th></th>
                </tr>
            </thead>
                <Posts posts={currPosts} auth={auth} url={url}/>
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
            <label><AiFillPlusSquare className='icon-button'/><br/>Cấp số mới</label>
        </div>
        </div>
      </div>
    </div>
  )
}

export default serial_number