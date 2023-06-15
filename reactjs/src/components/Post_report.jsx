import React from 'react'
// import { useNavigate } from "react-router-dom";

const Post_report = ({posts}) => {
    // const Navigate = useNavigate();
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_number_supply}>
                <td>{p.number_supply}</td>
                <td>{p.service_name}</td>
                <td>{p.starttime} - {p.startdate}</td>
                <td>
                    {
                        (p.status_active === 0 )? 
                        (<label><div className="point p-red"></div>Bỏ qua</label>) :
                        (p.status_active === 1 )?
                        (<label><div className="point p-wait"></div>Đang chờ</label>):
                        (<label><div className="point p-used"></div>Đã sử dụng</label>)
                    }
                </td>
                <td>{p.type_name_vi}</td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_report