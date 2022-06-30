/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect, useMemo} from 'react'
import axios from "axios";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import Input from '../components/Input';
import { FiSearch} from 'react-icons/fi';
import Pagination from '../components/Pagination';
import Posts from "../components/Post_diary"
import CalendarPicker from "../components/Mutiple_Calendar"
import moment from "moment"


const diary = () => {
  const groupFunction = 'diary';
  //phân quyền
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=9;
  const [totalRow, setTotalRow] = useState(1);

  const [begindate, setBegindate] = useState(moment().subtract(1,"day").format("YYYY-MM-DD"))
  const [enddate, setEnddate]= useState(moment().format("YYYY-MM-DD"))
  

  useEffect(()=>{
    axios.get('/api/diary')
    .then(res =>{
        if(res.data.status === 200){
          setPosts(res.data.diary);
          setBegindate(res.data.minDate)
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
      const filterActive = posts.filter(
        (p)=>  p.perform_date >= begindate && p.perform_date<= enddate
      );
      return (filterActive)
    }else{
      const filterActive = posts.filter(
        (p)=> p.perform_date >= begindate && p.perform_date<= enddate && 
              (p.username.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.address_IP.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.perform_operation.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1)
      );
      return (filterActive);
    }
   
  }
var filterData= useMemo(filterActive, [begindate, enddate, values.searchContent, posts])

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
        <Topbar title1='' title2='Cài đặt hệ thống' title3='Nhật  ký hoạt động'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
              <div className='row-item1-1'>
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
                    <th >Tên đăng nhập</th>
                    <th >Thời gian tác động</th>
                    <th >IP thực hiện</th>
                    <th >Thao tác thực hiện</th>
                </tr>
            </thead>
                <Posts posts={currPosts}/>
        </table>}
              </div>
            </div>
            <div className="row-item1">
                <Pagination currPage={currPage} limit={postPerPage} totalRow={totalRow} onPageChange={onPageChange}/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default diary