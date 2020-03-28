import React from 'react';
import './graph.css';
import { keyframes } from "styled-components";
class Graph extends React.Component {
    render() {
      //To get the graph with the recieved limit
      const limit = this.props.limit
      const color = 'lightgreen'
      let grow = keyframes`
      0% { background:linear-gradient(to right,${color} ${(limit/100)*0}%,rgba(0,0,0,0) 0%); }
      10% { background:linear-gradient(to right,${color} ${(limit/100)*10}%,rgba(0,0,0,0) 0%); }
      20% { background:linear-gradient(to right,${color} ${(limit/100)*20}%,rgba(0,0,0,0) 0%); }
      30% { background:linear-gradient(to right,${color} ${(limit/100)*30}%,rgba(0,0,0,0) 0%); }
      40% { background:linear-gradient(to right,${color} ${(limit/100)*40}%,rgba(0,0,0,0) 0%); }
      50% { background:linear-gradient(to right,${color} ${(limit/100)*50}%,rgba(0,0,0,0) 0%); }
      60% { background:linear-gradient(to right,${color} ${(limit/100)*60}%,rgba(0,0,0,0) 0%); }
      70% { background:linear-gradient(to right,${color} ${(limit/100)*70}%,rgba(0,0,0,0) 0%); }
      80% { background:linear-gradient(to right,${color} ${(limit/100)*80}%,rgba(0,0,0,0) 0%); }
      90% { background:linear-gradient(to right,${color} ${(limit/100)*90}%,rgba(0,0,0,0) 0%); }
      100% { background:linear-gradient(to right,${color} ${limit}%,rgba(0,0,0,0) 0%); }
      `
      let styles = {
        animation: `${grow} 3s forwards`
      };
      
      return (
        <div >  
          <div className="Container"><div className='loading' style={styles}>{limit}%</div></div>
        
       </div>
      )
    }
  }
export default Graph;