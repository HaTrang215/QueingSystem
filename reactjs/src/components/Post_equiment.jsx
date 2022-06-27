/* eslint-disable no-template-curly-in-string */
import React from 'react'
import ReadMore from '../components/Read_more'
import { useNavigate } from "react-router-dom";

const Post_equiment = ({posts, auth, url}) => {
    const Navigate = useNavigate();
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_equipment}>
                <td>{p.id_equipment}</td>
                <td>{p.equipment_name}</td>
                <td>{p.address_IP}</td>
                <td>
                    {
                        (p.status_active === 1 )? 
                        (<label><div className="point p-green"></div>Hoạt động</label>) : 
                        (<label><div className="point p-red"></div>Ngưng hoạt động</label>)
                    }
                </td>
                <td>
                    {
                        (p.status_connect === 1)? 
                            (<label><div className="point p-green"></div>Kết nối</label>): 
                            (<label><div className="point p-red"></div>Mất kết nối</label>)
                    }
                </td>
                <td>
                    <div className='title-text'>
                    <ReadMore>
                        {p.service_name}
                    </ReadMore>
                    </div>
                </td>
                <td>
                    <span 
                        className={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? 'title-func' : 'btn-block'} 
                        onClick={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? ()=>Navigate(`${url}/detail/${p.id_equipment}`) : ()=>''}>
                        Chi tiết
                    </span>
                </td>
                <td>
                    <span 
                        className={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? 'title-func' : 'btn-block'}
                        onClick={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? ()=>Navigate(`${url}/update/${p.id_equipment}`):()=>''}>
                        Cập nhật
                    </span>
                    </td>
                
                {
                    
                }
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_equiment