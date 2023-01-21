import React, {useState,useEffect} from "react";

import moment from "moment";
import "./styles.css";

export default function App() {
  // getting january

/*
const [date, setDate] = useState('');
const [day, setDay] = useState('');

useEffect(() => {
}, [date,day,months]);

const handleDate = (e) => {
  setDate(e.target.value);
}

const modifiedDay = (e) => {
  setDay(e.target.value);
}*/

let dateOld = moment(new Date(2018, 2, 24)).format("YYYY-MM-DD");
let year = moment(dateOld).format("YYYY");
let startDay = moment(dateOld).format("DD");

let month = moment(dateOld).format("MM");
let futureDate = moment(dateOld).add(500, 'days');
let finalDays = moment.duration(futureDate.diff(dateOld)).days();
let diffMonth = moment.duration(futureDate.diff(dateOld)).months() + moment.duration(futureDate.diff(dateOld)).years() * 12;
console.log(diffMonth);
let monthsStart = [];
  for (let i = -1; i < diffMonth; i++) {
    let monthStart = moment(moment(dateOld).add(i, 'months')).format("MMMM");
    monthsStart.push(monthStart);
  }
let months = monthsStart;
month = month - 2;

  //const months = moment.months();
  //const year = new Date().getFullYear();
  // function to check and grey out previous & next months visible dates
  const isExtraDays = (week, date) => {
    if (week === 0 && date > 10) {
      return true;
    } else if (week === 5 && date < 10) {
      return true;
    } else if (week === 4 && date < 10) {
      return true;
    } else {
      return false;
    }
  };
  let b = 0;
  //function to get all days by week
  const getDate = (a) => {
    if(a!=b){
      month++;
      b++;
    }
    if(month > 11){
      month = 0;
      year++;
    }
    var calendar = [];
    const startDate = moment([year, month])
      .clone()
      .startOf("month")
      .startOf("week");
    const endDate = moment([year, month]).clone().endOf("month");
    const day = startDate.clone().subtract(1, "day");
    // looping a month by a week
    while (day.isBefore(endDate, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone().format("DD"))
      ); 
    }
    
    if (a==0) {
      let flag = false;
      let block = false;
      for(let i = 0; i < calendar.length; i++) {
        for(let j = 0; j < 7; j++){
          if(calendar[0][j] == 1){
            block = true;            
          }
          if(calendar[i][j] ==startDay && block){
            flag = true;
            break;}
        calendar[i][j] = '';
        }
        if(flag)break;
        }
      }
    
    if (a==diffMonth) {
      let flag = false;
      let block = false;
      for(let i = 0; i < calendar.length; i++) {
        for(let j = 0; j < 7; j++){
          if(calendar[0][j] == 1){
            block = true;            
          }

          if(flag){
            calendar[i][j] = '';
          }
          if(calendar[i][j] ==finalDays && block){
            flag = true;
            }
        }
      }
    }
    
    if (calendar.length > 0) {
      return calendar.map((week, index) => (
        <tr className="calender-row">
          {week.map((day) => (
            <td className="calender-col">
              <span className="day-value">
                {isExtraDays(index, day) ? (
                  <span className="isDates-grey">{day}</span>
                ) : (
                  day
                )}
              </span>
            </td>
          ))}
        </tr>
      ));
    }
  };
  

  return (
    <div className="App">
      <div className="head-wall">
      {/*<input id="calendar" type="date" onChange={handleDate}></input>
      <input id="date" type="number" onChange={modifiedDay}></input>*/}
        <h1>Simple React calendar using moment.js </h1>
        <h1>{year}</h1>
      </div>
      {months.map((month, index) => (
        <div className="tableContainer">
          <table celled padded className="calender-date">
            <tr>
              <th className="month-name-col" colSpan={7}>
                <h1 className="month-name">{month}</h1>
              </th>
            </tr>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
            {getDate(index)}
          </table>
        </div>
      ))}
    </div>
  );
}