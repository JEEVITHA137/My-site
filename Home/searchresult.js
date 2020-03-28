import React,{ Component } from 'react';
import './search.css';
import axios from  'axios';
class SearchResults extends Component {
    constructor(){
        super();
        this.state ={
            subjects : ''
        }
    }
    componentWillMount(){
        //To get all the Subject details
        axios.get('http://localhost:3001/academy/subjects')
        .then(response => { 
            let newRay = response.data;
            this.setState({
               subjects : newRay
            })
        })
    }
render(){
    //To change the route to the selected option
    const clicked = (feed,type) => {
        if(type === 'Subject')
        {
            this.props.onRouteChange(feed,'Subject')
        }
        else {
        this.state.subjects.map((inside)=>
        {
            const filteredCourses = inside.courses.filter(course =>{
                return (
                    course.name === feed
                )
                })
          if(filteredCourses.length !== 0)
          {
            this.props.onRouteChange(inside.subject,'Course',feed)
        } 
         return null;
        }
        )
    }
    this.props.onSearchChange('')
    }
    //To show related courses
    const compileRelatedCourses = () => {
    let template = null;
    let allCourses = [];
    this.state.subjects.map((inside)=>
    {
     allCourses = [...allCourses,...inside.courses]
     return null;
    }
    )
   const filteredCourses = allCourses.filter(course =>{
        return (
            course.name.toLowerCase().includes(this.props.searchfield.toLowerCase())
        )
        })
    if(filteredCourses.length === 0)
    {
        template = <div  className='searched-heading'>No related Courses</div>
    }
    else{
       template = <div>{ filteredCourses.map((course,i)=>{
            return (<div key={i}><div className='searched-item' onClick={()=>clicked(course.name,'Course')}>{course.name}</div></div>)
        })}</div>
    }
    return template;
}
//To show related subjects
    const compileRelatedSubjects = () => {
        let template = null;
       const filteredSubjects = this.state.subjects.filter(subject =>{
            return (
                subject.subject.toLowerCase().includes(this.props.searchfield.toLowerCase().trim())
            )
            })
        if(filteredSubjects.length === 0)
        {
            template = <div  className='searched-heading'>No related Subjects</div>
        }
        else{
           template = <div>{ filteredSubjects.map((subject,i)=>{
                return (<div key={i}><div className='searched-item' onClick={()=>clicked(subject.subject,'Subject')}>{subject.subject}</div></div>)
            })}</div>
        }
        return template;
    }
    return(<div className='search-tab' >
        <div className='user-info-tab'>
        <h3>Related Subjects</h3>
        { this.state.subjects.length !== 0 ? compileRelatedSubjects() : null}  
        <h3>Related courses</h3>
        { this.state.subjects.length !== 0 ? compileRelatedCourses() : null}
        </div></div>
        )
}


}
export default SearchResults;