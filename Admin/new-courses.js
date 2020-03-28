import React,{  Component}  from 'react';
import axios from  'axios';
import './learner.css';
import EditCourse from '../Profile/editcourse';
class New_Courses extends Component {
    constructor() {
        super();
        this.state = {
           courses : [],
           changedCourse : [],
           course : '',
           place : 'home',
           error : '',
           Sub :{
               value : '',
               accepted : true
           },
           Url : {
               value : '',
               accepted : true
           },
           changed : false,
           edit : false
      }
      }
  
    componentWillMount(){ 
  // To get the newly requested courses
     axios.get(`http://localhost:3001/academy/new-course`)
     .then(response => { 
       
         this.setState({
             courses : response.data
         })
     })
     //To get the changed courses 
     axios.get(`http://localhost:3001/academy/change-course`)
     .then(response => { 
       
         this.setState({
             changedCourse : response.data
         })
     })
        }

//To set back
        changeBack = () => {
            axios.get(`http://localhost:3001/academy/new-course`)
            .then(response => {             
                this.setState({
                    courses : response.data
                })
            })
            axios.get(`http://localhost:3001/academy/change-course`)
            .then(response => {         
                this.setState({
                    changedCourse : response.data
                })
            })
            this.changePrev()
        }
     //To set back to Home
     changePrev = () => {
        this.setState({
            place : 'home',
            course : '',
            Sub :{
                value : '',
                accepted : true
            },
            Url : {
                value : '',
                accepted : true
            },
            changed : false
          })
    }

 //To add subject
    AddSubject =() => {
        this.setState({
            error : '',
            place : 'NewSub'
        })
    }

    //To change to view the Changed course
   changeToEditCourse = (data) => {
    this.setState({
        course : data
    })
    this.placeChange('edit-course')
}

  //To change to view the course
   changeToCourse = (data) => {
    this.setState({
        course : data
    })
    this.placeChange('course')
}

        //To change state of place to change render
        placeChange = (data) => {
            this.setState({
                place : data
            })
        }
    render(){
   //To store the value of new subject in state 
        const getStoreValue = (name,value) => {
            if(name === 'Subject Name')
            { 
               let trail = this.state.Sub
                trail.value = value;
                if(trail.value.length > 3 && trail.value.length < 30)
                {
                    trail.accepted = true;
                }
                else 
                {
                    trail.accepted = false;
                }
                this.setState({
                    Sub : trail,
                    changed :true
                })
            }
           else if(name === 'Url')
           {
            let trail = this.state.Url
                trail.value = value;
                if(trail.value.length > 3 )
                {
                    trail.accepted = true;
                }
                else 
                {
                    trail.accepted = false;
                }
                this.setState({
                    Url : trail,
                    changed : true
                })
         }
         }
       
        //To check validation and upload a new subject
        const proceed = () => {
            let trail = this.state.Sub
                if(trail.value.length > 3 && trail.value.length < 30)
                {
                    trail.accepted = true;
                }
                else 
                {
                    trail.accepted = false;
                }
                let trailed = this.state.Sub
                if(trailed.value.length > 3 && trailed.value.length < 30)
                {
                    trailed.accepted = true;
                }
                else 
                {
                    trailed.accepted = false;
                }
                this.setState({
                    Sub : trail,
                    Url : trailed
                })
          if(this.state.changed && this.state.Sub.accepted && this.state.Url.accepted)
          {
              let newSub = {
                subject : this.state.Sub.value,
                image : this.state.Url.value,
                courses : []
              }
              axios.post(`http://localhost:3001/academy/subjects`,newSub)
            this.changePrev()
          }
        }
        //To render as per state of place
        const compileNewCourses = () => {
            let template = null
           if(this.state.place === 'home')
           {
            template = <div>
                  <div className='add-button'><button onClick={()=>this.AddSubject()}>Add Subject</button></div>
                  {
                      this.state.courses.map((course,i)=>{
                          return (<div key={i} className='course-name-id'>
                            <div className='course-name-info clickable' onClick={() => this.changeToCourse(course)}>{course.course}</div>
                            <div className='course-name-info'></div>
                            <div className='course-name-info'>Uploaded by</div>
                            <div className='course-name-info'>{course.Username}</div>   
                            <div className='course-name-info'></div>
                            <div className='course-name-info clickable' onClick={()=> uploadRemove(course)}>Remove</div>
                            </div>)
                      })
                  }
                  <div className='course-name-info'>Changed Courses :  {this.state.changedCourse.length === 0 ? '0' : null}</div>
                  {
                    this.state.changedCourse.map((course,i)=>{
                        return (<div key={i} className='course-name-id'>
                          <div className='course-name-info clickable' onClick={() => this.changeToEditCourse(course)}>{course.course}</div>
                          <div className='course-name-info'></div>
                          <div className='course-name-info'>Changed by</div>
                          <div className='course-name-info'>{course.Username}</div>   
                          <div className='course-name-info'></div>
                          <div className='course-name-info clickable' onClick={()=> uploadEditRemove(course)}>Remove</div>
                          </div>)
                    })
                }
                </div>
           }
           else if(this.state.place === 'course')
           {
               template = <div>
               <EditCourse course={this.state.course} function={'new-course'} onRouteChange={this.props.onRouteChange} comeBack={this.changeBack} />
               </div>
           }    
           else if(this.state.place === 'edit-course')
           {
               template = <div>
               <EditCourse course={this.state.course} function={'change-course'} onRouteChange={this.props.onRouteChange} comeBack={this.changeBack} />
               </div>
           }   
           else if(this.state.place === 'NewSub')
           {
               template = <div>
               <div className='upload-info-comp'>
               <div className='upload-info'>Subject Name :</div>
               <input 
               type='text'
               value={this.state.Sub.value}
               placeholder={`Enter Subject Name`}
              onChange = {event => {
           getStoreValue('Subject Name',event.target.value)}
           }
               />
               {this.state.Sub.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
               </div>
               <div className='upload-info-comp'>
               <div className='upload-info'>Image Url :</div>
               <input 
               type='text'
               value={this.state.Url.value}
               placeholder={`Enter Url`}
              onChange = {event => {
           getStoreValue('Url',event.target.value)}
           }
               />
               {this.state.Url.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
               </div>
               <div className='lower-buttons'>
               <div className='prev-button-front'><img onClick={()=>this.changePrev()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
               <div className='next-button'><img onClick={()=>proceed()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
               </div></div>
           }
                return template
        }
      
          const uploadEditRemove =(data) => {
  
            //To remove the change course request data
        axios.post(`http://localhost:3001/academy/change-course/remove/?course=${data.course}`,data)
        axios.get(`http://localhost:3001/academy/change-course`)
     .then(response => { 
         this.setState({
             changedCourse : response.data,
             course : '',
             place : 'home'
         })
     })
  
    } 

        const uploadRemove =(data) => {
  
                //To remove the course request data
            axios.post(`http://localhost:3001/academy/new-course/remove/?course=${data.course}`,data)
            axios.get(`http://localhost:3001/academy/new-course`)
            .then(response => { 
                this.setState({
                    courses : response.data,
                    course : '',
                    place : 'home'
                })
            })
        } 
        return (
            <div className='total-learner'>
            {this.state.error === '' ? null : <div className='error-msg'>{this.state.error}</div>}
            { this.state.place === 'home' ? 
            <div className='course-name-info'>New Courses :  {this.state.courses.length === 0 ? '0' : null}</div>: null}
        {compileNewCourses()
            }
            </div>
        )
    }
}
export default New_Courses;