/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect, useMemo} from 'react'
import axios from "axios";
import GroupNavbar from '../components/GroupNavbar'
import OutsideClickHandler from 'react-outside-click-handler';
import Topbar from '../components/TopBar';
import {FaFileDownload} from 'react-icons/fa'
import {TiArrowUnsorted} from 'react-icons/ti'
import Pagination from '../components/Pagination';
import Posts from "../components/Post_report"
import CalendarPicker from "../components/Mutiple_Calendar"
import moment from "moment"
import Dropdown from '../components/Dropdown'

const report = () => {
  const groupFunction = 'report';
  // const url = '/'+groupFunction;
  //phân quyền
  // const id = localStorage.getItem('id_user')
  const [loading, setLoading] = useState(true)
  // const [auth, setAuth] = useState('')
  const [posts, setPosts] =useState([])
  const [currPage, setCurrPage] = useState(1);
  const postPerPage=9;
  const [totalRow, setTotalRow] = useState(1);
  // const [type,setType]=useState([]);
  // const [service, setService]=useState([]);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);
  const [isActive5, setActive5] = useState(false);

  const [begindate, setBegindate] = useState(moment().subtract(1,"day").format("YYYY-MM-DD"))
  const [enddate, setEnddate]= useState(moment().format("YYYY-MM-DD"))

  useEffect(()=>{
    axios.get('/api/list-serial-number')
    .then(res =>{
        if(res.data.status === 200){
          setPosts(res.data.serial_number);
          setBegindate(res.data.min_date);
          // setService(res.data.service);
          // setType(res.data.type_equiment)
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

  const [selected1, setSelected1] = useState({value: 0, label: 'Tất cả'})
  const options1 = [
    { value: 2, label: 'Tất cả' },
    { value: 1, label: 'Hoạt động' },
    { value: 0, label: 'Ngưng hoạt động' }
  ]
  const [selected2, setSelected2] = useState({value: 0, label: 'Tất cả'})
  const options2 = [
    { value: 2, label: 'Tất cả' },
    { value: 1, label: 'Hoạt động' },
    { value: 0, label: 'Ngưng hoạt động' }
  ]

  const [selected3, setSelected3] = useState({value: 0, label: 'Tất cả'})
  const options3 = [
    { value: 2, label: 'Tất cả' },
    { value: 1, label: 'Hoạt động' },
    { value: 0, label: 'Ngưng hoạt động' }
  ]

  const [selected4, setSelected4] = useState({value: 0, label: 'Tất cả'})
  const options4 = [
    { value: 2, label: 'Tất cả' },
    { value: 1, label: 'Hoạt động' },
    { value: 0, label: 'Ngưng hoạt động' }
  ]
  
  const filterActive = ()=>{
    return posts;
  }
var filterData= useMemo(filterActive, [begindate, enddate,posts])

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
                <div className="col-item6">
                  <CalendarPicker begindate={begindate} setBegindate={setBegindate} enddate={enddate} setEnddate={setEnddate}></CalendarPicker>
                </div>
              </div>
            </div>
            <div className="row-item1">
              <div className="content-table">
                {(loading)? <h3>Đang tải....</h3>:
              <table>
            <thead>
                <tr>
                    <th >
                      <div className="wrap-title-column">
                      Số thứ tự
                      <OutsideClickHandler onOutsideClick={()=>setActive1(false)}>
                        <TiArrowUnsorted onClick={()=>setActive1(!isActive1)}/>
                        {
                          (isActive1)?<Dropdown selected={selected1} setSelected={setSelected1} options={options1}/>:""
                        }
                      </OutsideClickHandler>
                      </div>
                    </th>
                    <th>
                    <div className="wrap-title-column">
                      Tên dịch vụ
                        <OutsideClickHandler onOutsideClick={()=>setActive2(false)}>
                        <TiArrowUnsorted onClick={()=>setActive1(!isActive2)}/>
                        {
                          (isActive1)?<Dropdown selected={selected2} setSelected={setSelected2} options={options2}/>:""
                        }
                        </OutsideClickHandler>
                    </div>
                      </th>
                    <th>
                    <div className="wrap-title-column">
                    Thời gian cấp
                      <OutsideClickHandler onOutsideClick={()=>setActive3(false)}>
                      <TiArrowUnsorted onClick={()=>setActive1(!isActive3)}/>
                        {
                          (isActive1)?<Dropdown selected={selected3} setSelected={setSelected3} options={options3}/>:""
                        }
                      </OutsideClickHandler>
                    </div>
                    </th>
                    <th>
                    <div className="wrap-title-column">
                    Tình trạng
                      <OutsideClickHandler onOutsideClick={()=>setActive4(false)}>
                      <TiArrowUnsorted onClick={()=>setActive1(!isActive4)}/>
                        {
                          (isActive4)?<Dropdown selected={selected4} setSelected={setSelected4} options={options4}/>:""
                        }
                      </OutsideClickHandler>
                    </div>
                    </th>
                    <th>
                    <div className="wrap-title-column">
                      Nguồn cấp
                      <OutsideClickHandler onOutsideClick={()=>setActive5(false)}>
                      <TiArrowUnsorted onClick={()=>setActive5(!isActive1)}/>
                        {
                          (isActive5)?<Dropdown/>:""
                        }
                      </OutsideClickHandler>
                    </div>
                    </th>
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
        <div 
            className='button-add'
          >
            <label><FaFileDownload className='icon-button'/><br/>Tải về</label>
        </div>
        </div>
      </div>
    </div>
  )
}


export default report