/* eslint-disable no-template-curly-in-string */
import React from 'react'
import { useNavigate } from "react-router-dom";
import ReadMore from "../components/Read_more"

const Post_service = ({posts, auth, url}) => {
    const Navigate = useNavigate();
    // console.log(posts)
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_service}>
                <td>{p.id_service}</td>
                <td>{p.service_name}</td>
                <td>
                <div className='title-text'>
                    <ReadMore>
                        {p.describe}
                    </ReadMore>
                    </div>
                </td>
                <td>
                    {
                        (p.status_active === 1 )? 
                        (<label><div className="point p-green"></div>Hoạt động</label>) : 
                        (<label><div className="point p-red"></div>Ngưng hoạt động</label>)
                    }
                </td>
                <td>
                    <span 
                        className={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? 'title-func' : 'btn-block'} 
                        onClick={(auth === '421' || auth === '631' || auth === '522'|| auth === '313')? ()=>Navigate(`${url}/detail/${p.id_service}`) : ()=>''}>
                        Chi tiết
                    </span>
                </td>
                <td>
                    <span 
                        className={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? 'title-func' : 'btn-block'}
                        onClick={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? ()=>Navigate(`${url}/update/${p.id_service}`):()=>''}>
                        Cập nhật
                    </span>
                    </td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_service