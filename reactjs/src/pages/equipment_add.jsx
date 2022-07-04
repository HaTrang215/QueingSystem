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
import { FiSearch} from 'react-icons/fi';
import {FaStarOfLife} from 'react-icons/fa'
import axios from "axios";


const equipment_add = () => {
  // const Navigate = useNavigate();
  const groupFunction = 'equipment'
  //phân quyền


 
  
  return (
    <div className="container">
      <GroupNavbar content={groupFunction}/>
      <div className="content">
        <Topbar title1='Thiết bị' title2='Danh sách thiết bị' title3='Thêm thiết bị'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Quản lý thiết bị</label>
            </div>
            <div className="background-content">
              <div className="add-content">
                <div className="row-item3 title">
                  <label>Thông tin thiết bị</label>
                </div>
                <div className="row-item4">
                  <div className="col-item6">
                    <div className="item">
                        <label className="add-title">Mã thiết bị:<FaStarOfLife className='stress'/></label><br/>
                        <input type="text" placeholder="Nhập mã thiết bị" />
                    </div>
                        <div className="item">
                            <label className="add-title">Tên thiết bị:<FaStarOfLife className='stress'/></label><br/>
                            <input type="text" placeholder="Nhập tên thiết bị" />
                        </div>
                        <div className="item">
                            <label className="add-title">Địa chỉ Ip:<FaStarOfLife className='stress'/></label><br/>
                            <input type="text" placeholder="Nhập địa chỉ Ip" />
                        </div>
                    </div>
                  <div className="col-item6">
                      <div className="item">
                            <label className="add-title">Loại thiết bị:<FaStarOfLife className='stress'/></label><br/>
                            <input type="text" placeholder="Nhập loại thiết bị"/>
                        </div>
                        <div className="item">
                            <label className="add-title">Tên đăng nhập: <FaStarOfLife className='stress'/></label><br/>
                            <input type="text" placeholder="Nhập tên đăng nhập" />
                        </div>
                        <div className="item">
                            <label className="add-title">Mật khẩu: <FaStarOfLife className='stress'/></label><br/>
                            <input type="text" placeholder="Nhập mật khẩu"/>
                        </div>
                      </div>
                  </div>
                    </div>
                      <div className="row-item3">
                          <label className="add-title">Dịch vụ sử dụng: <FaStarOfLife className='stress'/></label><br/>
                          <input type="text" placeholder="Nhập dịch vụ sử dụng"/>
                      </div>
                      <div className="row-item3">
                          <label className="add-title"><FaStarOfLife className='stress'/>Là trường thông tin bắt buộc</label>
                  </div>
                </div>
                <div className="row-item1">
                    <div className="add-button">
                        <button className="btn-cancel">Huỷ bỏ</button>
                        <button className="btn-add">Thêm thiết bị</button>
                    </div>
                </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default equipment_add