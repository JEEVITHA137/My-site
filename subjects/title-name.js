import React , { Component } from 'react';

class TitleName extends Component {
 
 //To render the title name
    render(){
   
    return (<div>
   
        <div className='title-name-quiz'>
        
             <h4 className='bright' onClick={() => this.props.onRouteChange(this.props.sub,'Title',this.props.cour,this.props.tit)}>{this.props.tit}</h4> 
   
    
   </div> </div>)
}
}
export default TitleName;