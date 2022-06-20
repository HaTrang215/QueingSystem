import React from 'react'
import '../css/style-circle-percent.css'


const Note_percent = (props) => {
  const {contain}=props;
  return (
    <div className="note-percent-content" >
      {contain.icon}
      <div className="name-note-content">
      <label className="name-note">{contain.nameNote}</label>
      </div>
        {contain.numberNote}
    </div>
  )
}

export default Note_percent