import React from 'react'
import "../css/style-select.css"
import SelectDropdown from '../components/Select_dropdown'

const Select = (props) => {
    const {selected, setSelected, title, options}=props
  
  return (
    <div className='select-wrap'>
        <label className="select-title">{title}</label>
        <div className="select-content">
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

export default Select