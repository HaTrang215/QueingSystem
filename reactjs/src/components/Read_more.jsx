import React, {useState} from 'react'
import '../css/style-main.css'
import OutsideClickHandler from 'react-outside-click-handler';

const Read_more = ({children}) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)
  return (
    <div className='wrap-readmore'>
      <OutsideClickHandler onOutsideClick={()=>setIsReadMore(true)}>
      <p className='title-text'>
          <span>{(isReadMore) ? text.slice(0,28) : text} ...</span><br/>
          <span onClick={()=>setIsReadMore(!isReadMore)} className='title-func'>
          {(isReadMore) ? 'Xem thêm' : ''}
          </span>
      </p>
      </OutsideClickHandler>
    </div>
  )
}

export default Read_more