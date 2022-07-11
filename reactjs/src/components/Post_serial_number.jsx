/* eslint-disable no-template-curly-in-string */
import React from 'react'
import { useNavigate } from "react-router-dom";

const Post_serial_number = ({posts, auth, url}) => {
    const Navigate = useNavigate();
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_number_supply}>
                <td>{p.number_supply}</td>
                <td>{p.patient_name}</td>
                <td>{p.service_name}</td>
                <td>{p.starttime} - {p.startdate}</td>
                <td>{p.expirytime} - {p.expirydate}</td>
                <td>
                    {
                        (p.status_active === 0 )? 
                        (<label><div className="point p-wait"></div>Đang chờ</label>) :
                        (p.status_active === 1 )?
                        (<label><div className="point p-used"></div>Đã sử dụng</label>):
                        (<label><div className="point p-red"></div>Bỏ qua</label>)
                    }
                </td>
                <td>{p.type_name_vi}</td>
                <td>
                    <span 
                        className={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? 'title-func' : 'btn-block'} 
                        onClick={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? ()=>Navigate(`${url}/detail/${p.id_number_supply}`) : ()=>''}>
                        Chi tiết
                    </span>
                </td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_serial_number