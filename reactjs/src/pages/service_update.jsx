/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable no-array-constructor */
/* eslint-disable no-const-assign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useState, useEffect, useMemo } from 'react'
// import { useNavigate } from "react-router-dom";
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
// import { FiSearch} from 'react-icons/fi';
import {FaStarOfLife} from 'react-icons/fa'
import axios from "axios";
import Select from '../components/Select_add';
import MultiSelect from '../components/Multiple_selected_add'
import { useNavigate,useParams } from "react-router-dom";

const service_update = () => {
  // const Navigate = useNavigate();
  const groupFunction = 'service'
  //phân quyền
  const id_user = localStorage.getItem('id_user')
  const {id} = useParams()
  const history = useNavigate();
  useEffect(()=>{
    
    const id_service=id
    // console.log(id_equipment)
    axios.get(`/api/edit-service/${id_service}`)
    .then(res =>{
        if(res.data.status === 200){
          setService({
            id_service:res.data.service[0].id_service,
            service_name:res.data.service[0].service_name,
            describe:res.data.service[0].describe,
          })
        }else{
          setErr(res.data.messenger);
          history("/service",{ replace: true });
        }
  });
  },[]);
const [serviceInput, setService] = useState({
  id_service:'',
  service_name:'',
  describe:'',
  start:'0001',
  end:'9999',
  prefix:'0001',
  surfix:'0001'
})

const handleInput = (e) =>{
  e.persist();
  setService({...serviceInput, [e.target.name]: e.target.value})
}

const[isCkecked1, setIsChecked1]= useState(false);

const[isCkecked2, setIsChecked2]= useState(false);

const[isCkecked3, setIsChecked3]= useState(false);


const[isCkecked4, setIsChecked4]= useState(false);

// const [string, setstring]= useState('')
const [err, setErr] = useState('');

const submitService = (e)=>{
  e.preventDefault();

  const data={
    id_service: serviceInput.id_service,
    service_name: serviceInput.service_name,
    describe: serviceInput.describe,
    auto_increate: (isCkecked1===true)?1:0,
    start: (isCkecked1===true)?serviceInput.start: '0',
    end: (isCkecked1===true)?serviceInput.end: '0',
    prefix: (isCkecked2===true)?serviceInput.prefix: '0',
    surfix: (isCkecked3===true)?serviceInput.surfix: '0',
    reset_daily: (isCkecked1===true)?1:0,
    id_user: id_user,
  }
  axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/update-service',data)
      .then(res =>{
          if(res.data.status === 200){
              console.log(res.data.status)
            history("/service",{ replace: true });
          }else if(res.data.status === 401){
            // setErr1(res.data.messenger);
          }else{
            // console.log(res.data.status)
            setErr(res.data.messenger);
          }
      })
  });
}

const cancelService = (e)=>{
  history("/service",{ replace: true });
}
// console.log(toString(selected))
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Dịch vụ' title2='Danh sách dịch vụ' title3='Cập nhật dịch vụ'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý dịch vụ</label>
            </div>
            <div className="background-content2">
            <div className="add-content">
                <div className="row-item5">
                    <label className='tittle'>Thông tin dịch vụ</label>
                </div>
                <div className="row-item5">
                    <div className="col-item11">
                        <div className="item">
                            <label className="add-title">Mã dịch vụ:<FaStarOfLife className='stress'/></label>
                            <input 
                              type="text" 
                              placeholder="Nhập mã dịch vụ" 
                              className='input-add'
                              name="id_service"
                              onChange={handleInput}
                              value={serviceInput.id_service}
                              disabled/>
                        </div>
                        <div className="item">
                            <label className="add-title">Tên dịch vụ:<FaStarOfLife className='stress'/></label>
                            <input 
                              type="text" 
                              placeholder="Nhập tên dịch vụ" 
                              className='input-add'
                              name="service_name"
                              onChange={handleInput}
                              value={serviceInput.service_name}/>
                        </div>
                    </div>
                    <div className="col-item11">
                        <div className="item">
                            <label className="add-title">Mô tả:<FaStarOfLife className='stress'/></label>
                            <textarea 
                              placeholder="Mô tả dịch vụ" 
                              className='input-add1'
                              name="describe"
                              onChange={handleInput}
                              value={serviceInput.describe}
                            > 
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="row-item5">
                    <label className='tittle'>Quy tắc cấp số</label>
                </div>
                <div className="row-item11">
                    <input 
                      type="checkbox" 
                      className="checkbox"
                      checked={isCkecked1}
                      onChange={(e)=>{setIsChecked1(e.target.checked)}}/>
                    <div className="content-checkbox">
                        <label className="title-checkbox">Tăng tự động:</label>
                        <input 
                          type="text" 
                          className="number-checkbox" 
                          placeholder="0001"
                          name="start"
                          onChange={handleInput}
                          value={serviceInput.start}
                        />
                        <label className="title-checkbox">đến</label>
                        <input 
                          type="text" 
                          className="number-checkbox" 
                          placeholder="9999"
                          name="end"
                          onChange={handleInput}
                          value={serviceInput.end}
                          />
                    </div>
                </div>
                <div className="row-item11">
                    <input 
                      type="checkbox" 
                      className="checkbox"
                      checked={isCkecked2}
                      onChange={(e)=>{setIsChecked2(e.target.checked)}}/>
                    <div className="content-checkbox">
                        <label className="title-checkbox">Prefix:</label>
                        <input 
                          type="text" 
                          className="number-checkbox" 
                          placeholder="0001"
                          name="prefix"
                          onChange={handleInput}
                          value={serviceInput.prefix}/>
                    </div>
                </div>
                <div className="row-item11">
                    <input 
                      type="checkbox" 
                      className="checkbox"
                      checked={isCkecked3}
                      onChange={(e)=>{setIsChecked3(e.target.checked)}}/>
                    <div className="content-checkbox">
                        <label className="title-checkbox">Surfix:</label>
                        <input 
                          type="text" 
                          className="number-checkbox" 
                          placeholder="0001"
                          name="surfix"
                          onChange={handleInput}
                          value={serviceInput.surfix}/>
                    </div>
                </div>
                <div className="row-item11">
                    <input 
                      type="checkbox" 
                      className="checkbox"
                      checked={isCkecked4}
                      onChange={(e)=>{setIsChecked4(e.target.checked)}}/>
                    <div className="content-checkbox">
                        <label className="title-checkbox">Reset mỗi ngày</label>
                    </div>
                </div>
                <div className="row-item3">
                    <label className="error-title1"><FaStarOfLife className='stress'/>Là trường thông tin bắt buộc</label>
                </div>
            </div>
            </div>
              <div className="row-item1">
                <div className="add-button">
                    <button className="btn-cancel-add" onClick={cancelService}>Huỷ bỏ</button>
                    <button className="btn-add" onClick={submitService}>Cập nhật dịch vụ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default service_update