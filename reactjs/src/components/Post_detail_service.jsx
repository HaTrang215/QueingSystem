/* eslint-disable no-template-curly-in-string */
import React from 'react'

const Post_detail_service = ({posts}) => {

    
  return (
    <tbody>
        {
            
        posts.map((p)=>(
            <tr key={p.id_number_supply}>
                <td>{p.number_supply}</td>
                <td>
                    {
                        (p.status_active === 0 )? 
                        (<label><div className="point p-red"></div>Bỏ qua</label>) :
                        (p.status_active === 1 )?
                        (<label><div className="point p-wait"></div>Đang chờ</label>):
                        (<label><div className="point p-used"></div>Đã sử dụng</label>)
                    }
                </td>
            </tr>
        ))
    }
    </tbody>
  )
}

export default Post_detail_service