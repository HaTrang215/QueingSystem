import React from 'react'
import { useNavigate } from "react-router-dom";

const Notification_box = () => {

  const Navigate = useNavigate()
  const detaiNumber = ()=>{ Navigate('/serial-number/detail')}

  return (
    <div className="notification-box">
      <div className="notic-title">
          <label className='label-title'>Thông báo</label>
      </div>
      <div className="notification-notice">
          <div className="notic-item" onClick={detaiNumber}>
              <p className="notic-name">Người dùng: Nguyễn Thị Thuỳ Dung</p>
              <p className="notic-content">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
          </div>
          <div className="seperate"></div>
          <div className="notic-item" onClick={detaiNumber}>
              <p className="notic-name" onClick={detaiNumber}>Người dùng: Nguyễn Thị Thuỳ Dung</p>
              <p className="notic-content">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
          </div>
          <div className="seperate"></div>
          <div className="notic-item" onClick={detaiNumber}>
              <p className="notic-name">Người dùng: Nguyễn Thị Thuỳ Dung</p>
              <p className="notic-content">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
          </div>
          <div className="seperate"></div>
          <div className="notic-item" onClick={detaiNumber}>
              <p className="notic-name">Người dùng: Nguyễn Thị Thuỳ Dung</p>
              <p className="notic-content">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
          </div>
          <div className="seperate"></div>
      </div>
    </div>
  )
}

export default Notification_box