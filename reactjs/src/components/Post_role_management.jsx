/* eslint-disable no-template-curly-in-string */
import React from 'react'
import ReadMore from '../components/Read_more'
import { useNavigate } from "react-router-dom";

const Post_role_management= ({posts, auth, url}) => {
    const Navigate = useNavigate();
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_role}>
                <td>{p.role_name}</td>
                <td>{p.SL}</td>
                <td>
                    <div className='title-text1'>
                    <ReadMore>
                        {p.role_describe}
                    </ReadMore>
                    </div>
                </td>
                <td>
                    <span 
                        className={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? 'title-func' : 'btn-block'}
                        onClick={(auth === '212' || auth === '321' || auth === '631'|| auth === '522')? ()=>Navigate(`${url}/update/${p.id_equipment}`):()=>''}>
                        Cập nhật
                    </span>
                    </td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_role_management