import React from 'react';
import './piechart.css';
const Piechart = ( { answer , total}) => {
  //To render Piechart with recieved value
    const degree = ((answer / total)*360);
      return (
          <div>
        <div className='position' >  
          <div className="Circle" style={{
 background:`linear-gradient(to ${degree > 180 ? 'left' : 'right'},aqua 50%,rgba(0,0,0,0) 0%)`}}></div>
          <div className="Circle1 position1" style={{transform: `rotate(${degree}deg)`}}></div>
          <div className={`layer position1 ${degree > 180 ? 'hidden' : null}`} ></div>
          </div>  
          <h2 className=" position2">{Math.ceil(degree/3.6)}%</h2>     
       </div>
      )
    }
export default Piechart;