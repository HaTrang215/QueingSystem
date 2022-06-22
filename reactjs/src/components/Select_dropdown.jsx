
import React, { useState } from 'react';
import '../css/style-select.css';
import OutsideClickHandler from 'react-outside-click-handler';


function Select_dropdown(props) {
    const {selected, setSelected, options}=props;
    const [isActive, setActive] = useState(false);
    
    return (
        <div className="dropdown">
            <OutsideClickHandler onOutsideClick={()=>setActive(false)}>
            <div className="dropdown-btn" onClick={() => setActive(!isActive)}>
                <label className="select">
                    {selected.label}
                </label>
                
                {(isActive && <div className="dropdown-content">
                                    {
                                        options.map((option) =>(
                                            (selected.value === option.value)?
                                            (<div className="dropdown-active" key={option.value.toString()}onClick={e => setSelected({value:option.value, label:option.label})}>{option.label}</div>) :
                                            (<div className="dropdown-item" key={option.value.toString()} onClick={e => setSelected({value:option.value, label:option.label})}>{option.label}</div>)
                                        ))
                                    }                    
                                    
                                </div>
                )}
                
            </div>
            </OutsideClickHandler>
        </div>
    );
}

export default Select_dropdown