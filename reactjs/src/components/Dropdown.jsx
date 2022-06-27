import React from 'react'
import '../css/style-select-dropdown.css';


const Dropdown = (props) => {
const {selected, setSelected, options}=props;
  return (
    <div className="dropdown-content">
        <div className={(selected === 0) ? "dropdown-active":"dropdown-item"}>
                Tất cả
        </div>
        {
            options.map((option) =>(
                (selected.value === option.value)?
                (<div className="dropdown-active" 
                    key={option.value.toString()}>
                {option.label}
                </div>) :
                (<div className="dropdown-item" 
                    key={option.value.toString()} 
                    onClick={e => {setSelected({value:option.value, label:option.label})}}>
                    {option.label}
                </div>)
            ))
        }                      
    </div>
  )
}

export default Dropdown