/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import '../css/style-select-dropdown.css';
import OutsideClickHandler from 'react-outside-click-handler';
import url from '../assets/images/caret-down-solid.svg'
import styled from '@emotion/styled'


function select_dashboard(props) {
    const {selected, setSelected, options, width}=props;
    const [isActive, setActive] = useState(false);

    const SelectPicker = styled('div')`
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 12px;
        color: #FF7506;
        background-image: url(${url});
        background-repeat: no-repeat;
        background-position: left ${(width > 106)? "95%":"85%"} top 9px;
        background-size: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
  `;
    
    return (
        <div className="dropdown">
            
            <SelectPicker onClick={() => setActive(!isActive)}>
                <label className="select">
                    {selected.label}
                </label>
                <OutsideClickHandler onOutsideClick={()=>setActive(false)}>
                {(isActive && <div className="dropdown-content">
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
                )}
                </OutsideClickHandler>
            </SelectPicker>
        </div>
    );
}

export default select_dashboard