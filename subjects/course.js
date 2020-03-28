import React, { Component } from 'react';
import './course.css';
import axios from  'axios';
import SubName from './subject-name';
class Course extends Component{ 
    constructor(){
        super();
        this.state = {
            course : ''
        }
    }
    componentDidMount(){ 
        //To get the course details
        axios.get(`http://localhost:3001/academy/course?course=${this.props.cour}`)
        .then(response => { 
            this.setState({
                course : response.data
            })
        })
    }

    componentWillReceiveProps(){ 
        //To change the state of course
        axios.get(`http://localhost:3001/academy/course?course=${this.props.cour}`)
        .then(response => { 
            this.setState({
                course : response.data
            })
        })
    }
    render(){
        //To compile the titles of course
const compileCourse = () => {
    return (
        <div> {
            this.state.course !=='' ? 
            this.state.course[0].titles.map((title, i) => {
            return (
                <div key={i} className='titles-list' onClick={() => this.props.onRouteChange(this.props.sub,'Title',this.props.cour,title.title)}>
                <h4>{title.title}</h4>
                </div>
            )        
        })
    : null
    }</div>
    )
}
    return(
        <div className='title-list'>
        <div className='upper-tags'>
       <SubName onRouteChange={this.props.onRouteChange} sub={this.props.sub}/>
        <h3 className='course-name'>{this.props.cour}</h3></div>
        {compileCourse()}
        </div>)
    }
}
export default Course;