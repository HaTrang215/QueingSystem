import React from 'react'
// import ReadMore from '../components/Read_more'
import { useNavigate } from "react-router-dom";

const Post_account_management = ({posts, auth, url}) => {
    const Navigate = useNavigate();
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id}>
                <td>{p.username}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>{p.role_name}</td>
                <td>
                    {
                        (p.status_active === 1 )? 
                        (<label><div className="point p-green"></div>Hoạt động</label>) : 
                        (<label><div className="point p-red"></div>Ngưng hoạt động</label>)
                    }
                </td>
                <td>
                    <span 
                        className={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? 'title-func' : 'btn-block'}
                        onClick={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? ()=>Navigate(`${url}/update/${p.id}`):()=>''}>
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

export default Post_account_management