/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-const-assign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useState, useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import Select from '../components/Select';
import Input from '../components/Input';
import { FiSearch} from 'react-icons/fi';
import {AiFillPlusSquare} from 'react-icons/ai'
import Pagination from '../components/Pagination';
import axios from "axios";
import Posts from "../components/Post_account_management"

const account_management = () => {
  const Navigate = useNavigate();
  const groupFunction = 'account-management'
  const url = '/'+groupFunction
  //phân quyền
  const id = localStorage.getItem('id_user')
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState('')
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=9;
  const [totalRow, setTotalRow] = useState(1);

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
      axios.get('/api/list-account-managerment')
      .then(res =>{
          if(res.data.status === 200){
            setPosts(res.data.account);
            setOptions1(res.data.role);
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

  const [selected1, setSelected1] = useState({value: 'all', label: 'Tất cả'})
  const [options1, setOptions1] = useState([])

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
      if (selected1.value==='all'){
        return posts;
      }
      else{
        const filterActive = posts.filter(
          (p)=> p.id_role === selected1.value
        );
        return (filterActive)
      }
    }else{
      const filterActive = posts.filter(
        (p)=> p.name.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.phone.toString().toLowerCase().indexOf(values.searchContent.toLowerCase()) > -1||
              p.username.toString().toLowerCase().indexOf(values.searchContent.toLowerCase())> -1||
              p.email.toString().toLowerCase().indexOf(values.searchContent.toLowerCase())> -1
      );
      return (filterActive);
    }
    
  }
 
  
var filterData= useMemo(filterActive, [selected1,values.searchContent, posts])


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
        <Topbar title1='' title2='Thiết bị' title3='Danh sách tài khoản'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Danh sách tài khoản</label>
            </div>
            <div className="row-item1">
              <div className='row-item1-1'>
                <div className="col-item4">
                  <Select 
                  selected={selected1} 
                  setSelected={setSelected1} 
                  options={options1.map((o)=>({value:o.id_role, label:o.role_name}))}
                  title={"Tên vai trò"}
                  onClick 
                  />
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
              {(loading === true)? 
                <h3>Đảng tải...</h3>:
              <table>
            <thead>
                <tr>
                    <th >Tên đăng nhập</th>
                    <th >Họ và tên</th>
                    <th >Số điện thoại</th>
                    <th >Email</th>
                    <th >Vai trò</th>
                    <th >Trạng thái hoạt động</th>
                    <th ></th>
                </tr>
            </thead>
                
                <Posts posts={currPosts} auth={auth} url={url} />
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
            <label><AiFillPlusSquare className='icon-button'/><br/>Thêm <br/>tài khoản</label>
        </div>
        </div>
      </div>
    </div>
  )
}

export default account_management