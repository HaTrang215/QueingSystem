/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import '../css/style-calendar.css'
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';
import moment from "moment"

const Calender_single = (props) => {
    const {begindate, setBegindate, enddate, setEnddate} = props
    const [value,setValue]=useState(moment())
    
  const [calendar, setCalendar] = useState([])
  
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  useEffect(()=>{
    const day =startDay.clone();
    const a=[];

    while(day.isBefore(endDay,"day")){
      a.push(
        Array(7).fill(0).map(()=> day.add(1, "day").clone())
      );
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    setCalendar(a);
  }, [value]);

  const handleSetDate=(day)=>{
    if (day.format("YYYY-MM-DD") <= begindate){
        setBegindate(day.format("YYYY-MM-DD"));
    }else if(day.format("YYYY-MM-DD")>=begindate && day.format("YYYY-MM-DD")<=enddate){
        setBegindate(day.format("YYYY-MM-DD"))
    }else{
        setEnddate(day.format("YYYY-MM-DD"))
    }
  }

  function isSelected(day){
    if(begindate===day.format("YYYY-MM-DD") || enddate === day.format("YYYY-MM-DD")){
      return true;
    };
  }

  function isInRange(day){
    if (day.format("YYYY-MM-DD") > begindate && day.format("YYYY-MM-DD") <enddate){
        return true;
    }
  }

  function afterToday(day){
    // const tomorrow = moment().clone().add(1, "day")
    return day.isAfter(new Date(), "day");
  }

  function isToday(day){
    return day.isSame(new Date(),"day");
  }

 function currDateName(){
    return value.format("DD");
 }

 function currMonthName(){
    switch( value.format("MM")) {
        case "01":
            return ("Jan");
        case "02":
            return ("Feb");
        case "03":
            return ("Mar");
        case "04":
            return ("Apr");
        case "05":
            return ("May");
        case "06":
            return ("Jun");
        case "07":
            return ("Jul");
        case "08":
            return ("Aug");
        case "09":
            return ("Sep");
        case "10":
            return ("Oct");
        case "11":
            return ("Nov");
        case "12":
            return ("Dec");
        default:
           return ( value.format("MM"));
      }
    
 }

 function currYearName(){
    return value.format("YYYY");
 }
  function dayStyles(day){
    if(afterToday(day)) return "after";
    if(isSelected(day)) return "selected";
    if(isInRange(day)) return "in-range";
    if (isToday(day)) return "today";
    if (noneBeforeDate(day)) return "noneBefore"
    if (noneAfterDate(day)) return "noneAfter"
    return "";
  }


  function preMonth(){
    return value.clone().subtract(1, "month");
  }

  function nextMonth(){
    return value.clone().add(1, "month");
  }

  function thisMonth(){
    return value.isSame(new Date(), "month")
  }

  function noneBeforeDate(day){
    if (value.isBefore(day, "month") && day.format("DD") >= 1) return true;
  }

  function noneAfterDate(day){
    if (value.isAfter(day, "month") && (day.format("DD") <= 31)) return true;
  }
  return (
    <div className="calendar1">
        <div className="header1">
            <label className="previous" onClick={()=> setValue(preMonth())}><IoIosArrowBack /></label>
            <label className ="">
                {currDateName()} {" "}{currMonthName()} {" "}{currYearName()}
            </label>
            <label className="next" onClick={()=>(thisMonth()) ? '' :setValue(nextMonth())}><IoIosArrowForward className={(thisMonth())? 'none': ''}/></label>
        </div>
        <div className="seperate"></div>
        <div className="body1">
            <div className="day-name">
                {
                    ["Mo", "Tue", "We", "Th", "Fr", "Sa", "Sun"].map((d)=>(<label>{d}</label>))
                }
            </div>
        {
            calendar.map((week)=>(
            <div className='day-container' key={week}>
                {week.map((day)=>(
                <div className='day' onClick={()=>(afterToday(day))?'':handleSetDate(day)}>
                    <label className={dayStyles(day)} key={value}>
                    {day.format("DD").toString()}
                    </label>
                </div>
                ))}
            </div>
            ))
        }
        </div>
      
    </div>
  )
}

export default Calender_single