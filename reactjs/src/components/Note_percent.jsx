import React from 'react'
import '../css/style-circle-percent.css'
import styled from '@emotion/styled'
import  {VscCircleFilled} from 'react-icons/vsc'


const Note_percent = (props) => {
  const {contain}=props;

  const IconNote = styled('div')`
    font-size: 8px;
    line-height: 21px;
    color: ${contain.colorIcon};
    margin-top: 3px;
  `;

  const NumberNote = styled('label')`
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: ${contain.colorNumber};
    margin-top: 3px;
  `;

  return (
    <div className="note-percent-content" >
      <IconNote><VscCircleFilled /></IconNote>
      <div className="name-note-content">
      <label className="name-note">{contain.nameNote}</label>
      </div>
        <NumberNote>{contain.numberNote}</NumberNote>
    </div>
  )
}

export default Note_percent