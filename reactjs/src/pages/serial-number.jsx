/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import GroupNavbar from '../components/GroupNavbar'
import Topbar from '../components/TopBar';
import Select from '../components/Select';
import Input from '../components/Input';
import { FiSearch} from 'react-icons/fi';
import {AiFillPlusSquare} from 'react-icons/ai'
import Pagination from '../components/Pagination';

const serial_number = () => {
  const [selected1, setSelected1] = useState({value: '0', label: 'Tất cả'})
  const options1 = [
    { value: '0', label: 'Tất cả' },
    { value: '1', label: 'Hoạt động' },
    { value: '2', label: 'Ngưng hoạt động' }
  ]

  const [values, setValue]= useState({
    searchContent: "",
})

const inputs = [
    {
        id: 1,
        name: "search",
        type: "text",
        placeholder: "Nhập từ khoá",
        label: "Từ khoá",
        false: "true",
        icon: <FiSearch />,
        notSubmit: true
    }
]

const onChange = (e) =>{
  setValue({...values, [e.target.name]: e.target.value})
}

const [currPage, setCurrPage] = useState(1);

function onPageChange (newPage){
  setCurrPage(newPage);
}

const limit = 9
const totalRow= 70
  
  return (
    <div className="container">
      <GroupNavbar content='serial-number'/>
      <div className="content">
        <Topbar title1='' title2='Cấp số' title3='Danh sách cấp số'/>
        <div className="wrap-main">
        <div className="main">
          <div className="wrap-table">
            <div className="row-item1">
                <label className='name-page'>Danh sách cấp số</label>
            </div>
            <div className="row-item1">
              <div className='row-item1-1'>
                <div className="col-item4">
                  <Select selected={selected1} setSelected={setSelected1} options={options1} title={"Trạng thái hoạt động"}/>
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
            <tbody>
                <tr>
                    <td>KIO_01</td>
                    <td>Kiosk</td>
                    <td>Mô tả dịch vụ 1</td>
                    <td><div className="point p-red"></div>Ngưng hoạt động</td>
                    <td>Chi tiết</td>
                    <td>Cập nhật</td>
                </tr>
                <tr>
                    <td>KIO_01</td>
                    <td>Kiosk</td>
                    <td>Mô tả dịch vụ 2</td>
                    <td><div className="point p-green"></div>Hoạt động</td>
                    <td>Chi tiết</td>
                    <td>Cập nhật</td>
                </tr>
            </tbody>
        </table>
              </div>
            </div>
            <div className="row-item1">
                <Pagination currPage={currPage} limit={limit} totalRow={totalRow} onPageChange={onPageChange}/>
            </div>
          </div>
        </div>
        <div className="button-add">
            <label><AiFillPlusSquare className='icon-button'/><br/>Thêm thiết bị</label>
        </div>
        </div>
      </div>
    </div>
  )
}

export default serial_number