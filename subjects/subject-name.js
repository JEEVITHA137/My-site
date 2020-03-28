import React,{ Component } from 'react';
import './course.css';
import axios from  'axios';

class SubName extends Component{
    constructor(){
        super();
        this.state = {
            subject: ''
        }
    }

    componentDidMount(){ 
        //To get the info of the subject
    this._isMounted = true;
        axios.get(`http://localhost:3001/academy/subject?subject=${this.props.sub}`)
        .then(response => { 
            this.setState({
                subject : response.data
            })
        })
    }
    componentWillReceiveProps(){ 
        //To get the info of the changed subject
        axios.get(`http://localhost:3001/academy/subject?subject=${this.props.sub}`)
        .then(response => { 
            this.setState({
                subject : response.data
            })
        })
    }
    componentWillUnmount = () => {
        this._isMounted = false;
      }
     // To render the subject name and image
    render(){
return (<div>
    {
        this.state.subject !=='' ? 
    <div className='course-subject-name'><h3  onClick={() => this.props.onRouteChange(this.props.sub,'Subject')}>{this.props.sub}</h3> 
    <img alt='subject'  onClick={() => this.props.onRouteChange(this.props.sub,'Subject')} className='bright' style={{width:'50px' ,height:'50px'}} src={require(`../photos/${this.state.subject[0].image}`)} /></div>
: null    
}</div>)
}
}
export default SubName;