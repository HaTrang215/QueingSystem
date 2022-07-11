import React from 'react'
import "../css/style-select.css"
import SelectDropdown from '../components/Select_add'

const Select1 = (props) => {
    const {selected, setSelected, title, options}=props
  
  return (
    <div className='select-wrap1'>
        <label className="select-title">{title}</label>
        <div className="select-content1">
            <SelectDropdown 
              selected={selected} 
              setSelected={setSelected} 
              keys={options.key} 
              options={options} 
              width={300}/>
        </div>
    </div>
  )
}

export default Select1