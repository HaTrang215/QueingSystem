/* eslint-disable react/no-typos */
/* eslint-disable no-use-before-define */

import React from 'react'
import '../css/style-pagination.css'
import {RiArrowLeftSFill, RiArrowRightSFill} from 'react-icons/ri'

const Pagination = (props) => {
  const{ currPage, limit, totalRow, onPageChange}=props
  
  const totalPage = Math.ceil(totalRow/limit)

  function handlePageChange(newPage){
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  function upCompare(compare){
    if(compare <= 5) return true;
  }

  function betweenCompare(compare){
    const numCompare = totalPage - 5;
    if(compare > 5 && compare <= numCompare) return true;
  }

  function downCompare(compare){
    const numCompare = totalPage - 5;
    if(compare > numCompare) return true;
  }

  function pageCompare(compare){
    if(upCompare(compare)) return 'up';
    if (downCompare(compare)) return 'down';
    if (betweenCompare(compare)) return 'between';
  }
  return (
    <div className="wrap-pagination">
      <div className="pagination">
        <label className={(currPage===1)? 'btn-page none':'btn-page'} onClick={()=> (currPage===1)? '': handlePageChange(currPage-1)}><RiArrowLeftSFill /></label>
        <label className={(pageCompare(currPage)==='up' && currPage===1)? 'btn-page active' : 'btn-page'} onClick={()=>handlePageChange(1)}>1</label>
        <label className={(pageCompare(currPage)==='up' && currPage===2)? 'btn-page active' : ((pageCompare(currPage)==='up'||pageCompare(currPage)==='between') && currPage !== totalPage && totalPage !== 2 )? 'btn-page':'block'} onClick={()=>handlePageChange(2)}>2</label>
        <label className={(pageCompare(currPage)==='up' && currPage===3)? 'btn-page active' : (pageCompare(currPage)==='up' && currPage !== totalPage && totalPage !== 2 && totalPage !== 3)? 'btn-page':'block'} onClick={()=>handlePageChange(3)}>3</label>
        <label className={(pageCompare(currPage)==='up' && currPage===4)? 'btn-page active' : (pageCompare(currPage)==='up' && currPage !== totalPage && totalPage !== 2 && totalPage !== 3 && totalPage !== 4)? 'btn-page':'block'} onClick={()=>handlePageChange(4)}>4</label>
        <label className={(pageCompare(currPage)==='up' && currPage===5)? 'btn-page active' : (pageCompare(currPage)==='up'&& currPage !== totalPage && totalPage !== 2 && totalPage !== 3 && totalPage !== 4 && totalPage !== 5)? 'btn-page':'block'} onClick={()=>handlePageChange(5)}>5</label>
        <label className={((pageCompare(currPage)==='up' || pageCompare(currPage)==='between')&& currPage !== totalPage && totalPage !== 2 && totalPage !== 3 && totalPage !== 4 && totalPage !== 5 && totalPage !== 6)? 'btn-page' : 'block'}>...</label>
        <label className={(pageCompare(currPage)==='between')? 'btn-page active' :'block'}>{currPage}</label>
        <label className={(pageCompare(currPage)==='down' || pageCompare(currPage)==='between')? 'btn-page' : 'block'}>...</label>
        <label className={(pageCompare(currPage)==='down' && currPage===(totalPage-4))? 'btn-page active' : (pageCompare(currPage)==='down')? 'btn-page':'block'} onClick={()=>handlePageChange(totalPage-4)}>{totalPage-4}</label>
        <label className={(pageCompare(currPage)==='down' && currPage===(totalPage-3))? 'btn-page active' : (pageCompare(currPage)==='down')? 'btn-page':'block'} onClick={()=>handlePageChange(totalPage-3)}>{totalPage-3}</label>
        <label className={(pageCompare(currPage)==='down' && currPage===(totalPage-2))? 'btn-page active' : (pageCompare(currPage)==='down')? 'btn-page':'block'} onClick={()=>handlePageChange(totalPage-2)}>{totalPage-2}</label>
        <label className={(pageCompare(currPage)==='down' && currPage===(totalPage-1))? 'btn-page active' : ((pageCompare(currPage)==='down'|| pageCompare(currPage)==='between') && currPage !== totalPage)? 'btn-page':'block'} onClick={()=>handlePageChange(totalPage-1)}>{totalPage-1}</label>
        <label className={(pageCompare(currPage)==='down' && currPage===(totalPage))? 'btn-page active' :(currPage !== totalPage)? 'btn-page':'block'} onClick={()=>handlePageChange(totalPage)}>{totalPage}</label>
        <label className={(currPage===totalPage)? 'btn-page none':'btn-page'} onClick={()=> (currPage===totalPage)? '': handlePageChange(currPage+1)}><RiArrowRightSFill/></label>
      </div>
    </div>
  )
}

export default Pagination