/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, useEffect} from 'react';
import '../css/style-select-dropdown.css';
// import OutsideClickHandler from 'react-outside-click-handler';
import {MdOutlineClose} from 'react-icons/md'


class Multiple_selected_add extends Component {
    state = {
        isOpen: false,
        isSelected: false,
        listSelected:[],
      };
      
    
      handleSelect = (value, label) => {
        const {listSelected} = this.state;
    
        if (!this.state.isOpen) {
          document.addEventListener('click', this.handleOutsideClick, false);
        } else {
          document.removeEventListener('click', this.handleOutsideClick, false);
        }
    
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
          isSelected: true,
          listSelected: listSelected.concat({value:value,label:label}),
        }));
      };
    
      handleRemoveItem = (index)=> {
        const { listSelected } = this.state;
        listSelected.splice(index, 1);
        this.setState({
          listSelected: listSelected
        });
      }
    
      handleOpen = () => {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen,
        }));
      }
    
       handleOutsideClick = () => {
        this.handleSelect();
      };
      
      UNSAFE_componentWillMount(){
        const {selected} =this.props
            this.setState({
              listSelected: selected
            })
      }
      
      componentDidUpdate(){
        const { setSelected} = this.props;
        const { listSelected} = this.state;
        setSelected(listSelected);
      }
      filterData = () => {
        const { data } = this.props;
        const { listSelected } = this.state;
    
        return data.filter(item => !listSelected.find(s => item.label === s.label))
      }
 
    
       render() {
        const { placeholder} = this.props;
        const { defaultTitle, listSelected, isSelected, isOpen } = this.state;
        const filteredData = this.filterData();
        
        return (
          <div className='option-custom'>
            <div className='select-input select-input--multiple' >
              <div className='selected-list'>
                { (listSelected.length === 0)?
                  (<div className='placeholder'>
                   {placeholder}
                </div>):
                (listSelected.map((item, index) => (
                  <div className='selected-item'>
                    <span 
                      key={index} 
                    >
                      {item ?  item.label : placeholder}
                    </span>
                    <span onClick={() => this.handleRemoveItem(index)}>
                      <MdOutlineClose className='remove-icon' />
                    </span>
                  </div>
                )))}
                <div className="select-click" onClick={this.handleOpen} />
              </div>
            </div>
    
             {isOpen ?
              <div className='select-list'>
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => this.handleSelect(filteredData[index].value, filteredData[index].label)}
                    className='select-item'
                  >
                    <span className='select-title'>{item.label}</span>
                  </div>
                ))}
              </div>
              : ''
            }
          </div>
        );
      }
    }

export default Multiple_selected_add