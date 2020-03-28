import React ,{Component} from 'react';
import './dashboard.css';
import axios from  'axios';
import GraphChart from '../subjects/graph';
import EditCourse from './editcourse';
import Piechart from '../subjects/piechart';

class Dashboard extends Component {
    constructor() {
      super();
      this.state = {
          First : [],
          Courses : [],
          Details : false,
          Course : '',
          editing : false,
          course : ''

    }
    }
    
    componentWillMount(){
        //To get the logged user info
        if( this.props.loggedas !== 'Instructor')
        {
        axios.get(`http://localhost:3001/academy-log/learner-detail/?username=${this.props.logged}`)
        .then(response => { 
            let newRay = response.data;
            let firstValue = [...newRay[0].Courses];
          this.setState({
              Courses : [...firstValue],
              First : [...newRay]
          })
        })
    } 
    else
    {
    axios.get(`http://localhost:3001/academy-log/teacher-detail/?username=${this.props.logged}`)
    .then(response => { 
        let newRay = response.data;
        let firstValue = [...newRay[0].Courses];
      this.setState({
          Courses : [...firstValue],
          First : [...newRay]
      })
    })
}
    }
    comeBack = () => {
        this.setState({
            editing : false,
            course : ''
        })
    }
    render (){
        //To change to edit
        const changeToEdit =(data) => {
            this.setState({
                editing :true,
                course : data
            })
        }
        //To make Edit in course 
        const compileEditCourse = () =>{
             let template = <div>
            <EditCourse course={this.state.course} function={'edit-course'} comeBack={this.comeBack} logged={this.props.logged}/>
            </div>
            return template
            
        }
    const compileTeachBoard = () => {
//To render teacher dashboard
        return(
            <div>
            <div className='profile-username'>{this.props.logged}</div>
            <div className='Courses-Heading'>Courses Uploaded : {this.state.Courses.length === 0 ? '0' :null }</div>
            {this.state.Courses.length !== 0 ? <div>
                {this.state.Courses.map((course,i)=>{
                  return (
                      <div key ={i} className='uploaded-courses' >
                       <div  className='uploaded-course'><h4>{course.course}</h4></div>
                       <div className='clickable make-edit' onClick={()=>changeToEdit(course)}>Edit</div>
                       </div>
                       )
                })}
                </div> :null }
            </div>
        )
    }
    //To render quiz info of the course clicked
    const compileCourseDetails = (course) =>{
       let template = null
        if(course.quiz.length === 0){
            template = <div> No Quiz Attended Till Now</div>
        }
        else
        {
       template =  course.quiz.map((quiz,i)=>{
            return (
                <div key={i} className='Course-content'>
                <Piechart answer={quiz.answered} total={quiz.no_of_Ques} />
                <div className='Quiz-Heading'>{quiz.video}</div>
                </div>
            )
        })
    }
        return template
    }
    //To change the course in state
    const changeCourse = (name) => {
        if(this.state.Course === name)
        {
            this.setState({
                Details: this.state.Details ? false : true
            })
       
        }
        else{
         this.setState({
             Course : name,
             Details : true
         })
        }
    }
    //To compile learner dashboard
const compileDashboard = () => {
    return (
        <div >
        <div className='profile-username'>{this.props.logged}</div>
        <div className='dashboard-user'>
        <div className='Courses-Heading'>Courses on Progress : {this.state.Courses.length === 0 ? '0' : this.state.Courses.length} </div>
        {
            this.state.Courses.length === 0 ? 
            null : <div>
            {this.state.Courses.map((course,i)=>{
                return(
                    <div key={i}>
                <div className='Courses-Heading clickable' onClick={()=>changeCourse(course.name)}>Course : {course.name}</div>
                <GraphChart limit={course.completed} />
                {this.state.Details && this.state.Course === course.name ? <div className='Courses-Heading'>Quiz</div>: null}
                {this.state.Details && this.state.Course === course.name ? <div className='Course-Details'>{compileCourseDetails(course)}</div>: null}
              
                </div>
               
                )
            })
           
            }</div>}
        </div>
        </div>
    )
}
return(
    <div className='dashboard-panel'>
    {this.state.editing ? <div>{compileEditCourse()}</div>
    :
    <div>
    {this.props.loggedas === 'Learner' ? <div>
    {compileDashboard()}
    <div className='image'>
    <img alt='Become Instructor' style={{width:115 ,height:70 }}  src={require('../photos/Become-Instructor.png')} onClick={()=> this.props.onLoggedChange('Instructor')} />
    </div></div>
    : <div>
    {compileTeachBoard()}
    <div className='image'>
    <img alt='new course' style={{width:135 ,height:70 }} src={require('../photos/new-Course.png')} onClick={() => this.props.onRouteChange('upload-course','Link')} />
    </div>
    </div>}
    </div>}
    </div>
   
    )
}
}
export default Dashboard;