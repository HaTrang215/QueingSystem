/* eslint-disable no-template-curly-in-string */
import React from 'react'
// import { useNavigate } from "react-router-dom";
// import ReadMore from "../components/Read_more"

const Post_service = ({posts}) => {
    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_diary}>
                <td>{p.username}</td>
                <td>{p.date} {p.time}</td>
                <td>{p.address_IP}</td>
                <td>{p.perform_operation}</td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_service