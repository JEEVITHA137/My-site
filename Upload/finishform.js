import React,{ Component } from 'react';
import axios from  'axios';

class FinishForm extends Component{
    constructor(){
        super();
        this.state = {
            subject : ''
        }
    }
    
    
    render(){
    const UploadAll = () => {
        //To upload the course in request when submitted
        axios.post(`http://localhost:3001/academy/new-course`,this.props.course[0])
        
        this.props.onRouteChange('Dashboard','Link');
    }
 return (<div>
    <div className='uploaded-info'><div className='uploaded-info-content'>Course Name </div>:<div className='uploaded-info-content'> {this.props.course[0].course}</div></div>
    <div className='uploaded-info'><div className='uploaded-info-content'>Subject </div>:<div className='uploaded-info-content'> {this.props.course[0].subject}</div></div>
    <div className='uploaded-info'><div className='uploaded-info-content'>Description </div>:<div className='uploaded-info-content'> {this.props.course[0].description}</div></div>
    <div className='uploaded-info'><div className='uploaded-info-content'>No of Titles </div>:<div className='uploaded-info-content'> {this.props.no}</div></div>
    <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>this.props.getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            <div className='next-button'> <img onClick={()=>UploadAll()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
          </div>
    </div>) 
 }
}
export default FinishForm;