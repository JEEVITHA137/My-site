import React, { Component } from 'react';
import TitlesForm from './titlesfom';
import FinishForm from './finishform';
import './upload.css';
class Upload extends Component {
constructor(){
    super();
    this.state = {
        course : [
            {
            course:{
                value : '',
                accepted : true
            },
            subject:{
                value : '',
                accepted : true
            },
            description:{
                value : '',
                accepted : true
            },
            no_of_titles : {
                value : '',
                accepted : true
            },
            titles:[]
            }
        ],
      place : 'start',
      no : 0
    }
}
//To get back to starting page
getBAckFromfirst = () => {
    let oldCourse =  [
        {
        course:{
            value : '',
            accepted : true
        },
        subject:{
            value : '',
            accepted : true
        },
        description:{
            value : '',
            accepted : true
        },
        no_of_titles : {
            value : '',
            accepted : true
        },
        titles:[]
        }
    ]
    oldCourse[0].course.value = this.state.course[0].course;
    oldCourse[0].subject.value = this.state.course[0].subject;
    oldCourse[0].no_of_titles.value = this.state.course[0].titles.length;
    oldCourse[0].description.value = this.state.course[0].description;
    this.setState({
        place : 'start',
        course : oldCourse
    })
}
//To get back to starting page
getBAck = () => {
    let oldCourse =  [
        {
        course:{
            value : '',
            accepted : true
        },
        subject:{
            value : '',
            accepted : true
        },
        description:{
            value : '',
            accepted : true
        },
        no_of_titles : {
            value : '',
            accepted : true
        },
        titles:[]
        }
    ]
    oldCourse[0].course.value = this.state.course[0].course.value;
    oldCourse[0].subject.value = this.state.course[0].subject.value;
    oldCourse[0].no_of_titles.value = this.state.course[0].no_of_titles.value;
    oldCourse[0].description.value = this.state.course[0].description.value;
    this.setState({
        place : 'start',
        course : oldCourse
    })
}
//To store the titles 
uploadTitles = (feed) => {
    let newCourse = [{
        Username : this.props.logged,
        course:'',
        subject:'',
        description:'',
        titles:[]
        }]

    newCourse[0].course = this.state.course[0].course.value;
    newCourse[0].subject = this.state.course[0].subject.value;
    newCourse[0].description = this.state.course[0].description.value;
    newCourse[0].titles = [...feed];
    this.setState({
        no : this.state.course[0].no_of_titles.value,
        course :  newCourse,
        place : 'finish',
    })
}
render(){
    //To store the values with validation
    const getStoreValue = (name,value) => {
      let trail = [...this.state.course]
     if(name === 'Course Name')
     {
         trail[0].course.value = value;
         if(trail[0].course.value.length > 3 && trail[0].course.value.length < 30)
         {
             trail[0].course.accepted = true;
         }
         else 
         {
             trail[0].course.accepted = false;
         }
     }
     else if(name === 'Subject')
     {
         trail[0].subject.value = value;
         if(trail[0].subject.value.length > 5 && trail[0].subject.value.length < 30)
         {
             trail[0].subject.accepted = true;
         }
         else 
         {
             trail[0].subject.accepted = false;
         }
     }
     else if(name === 'Description')
     {
         trail[0].description.value = value;
         if(trail[0].description.value.length > 15 && trail[0].description.value.length < 400)
         {
             trail[0].description.accepted = true;
         }
         else 
         {
             trail[0].description.accepted = false;
         }
     }
     else if(name === 'No of Titles')
     {
        trail[0].no_of_titles.value = value;
        if(trail[0].no_of_titles.value > 0 && trail[0].no_of_titles.value < 13)
        {
            trail[0].no_of_titles.accepted = true;
        }
        else 
        {
            trail[0].no_of_titles.accepted = false;
        }
     }
      this.setState({
          course : [...trail]
      })

   }
   //changing to titles form on validation
    const onUploadSubmit = () => {
      
        let trail = [...this.state.course]
        if(trail[0].course.value.length > 0 && trail[0].course.value.length < 30)
        {
            trail[0].course.accepted = true;
        }
        else 
        {
            trail[0].course.accepted = false;
        }
        if(trail[0].subject.value.length > 0 && trail[0].subject.value.length < 30)
        {
            trail[0].subject.accepted = true;
        }
        else 
        {
            trail[0].subject.accepted = false;
        }
        if(trail[0].description.value.length > 15 && trail[0].description.value.length < 400)
        {
            trail[0].description.accepted = true;
        }
        else 
        {
            trail[0].description.accepted = false;
        } 
        if(trail[0].no_of_titles.value > 0 && trail[0].no_of_titles.value < 13)
        {
            trail[0].no_of_titles.accepted = true;
        }
        else 
        {
            trail[0].no_of_titles.accepted = false;
        }
        this.setState({
            course : [...trail]
        })

        if (this.state.course[0].course.accepted && this.state.course[0].subject.accepted && this.state.course[0].no_of_titles.accepted && this.state.course[0].description.accepted )
        {
            this.setState({
            place : 'titles'
        })
       }

    }
    //To render upload form
    const CompileGetUploadInfo = () => {
       return (
           <div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Course Name :</div>
            <input 
            type='text'
            value = {this.state.course[0].course.value}
            placeholder={`Enter Course Name`}
           onChange = {event => {
        getStoreValue('Course Name',event.target.value)}
        }
            />
            {this.state.course[0].course.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Subject :</div>
            <input 
            type='text'
            value = {this.state.course[0].subject.value}
            placeholder={`Enter Subject`}
           onChange = {event => {
        getStoreValue('Subject',event.target.value)}
        }
            />
            {this.state.course[0].subject.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>No of Titles :</div>
            <input 
            type='text'
            value = {this.state.course[0].no_of_titles.value}
            placeholder={`Enter No of Titles`}
           onChange = {event => {
        getStoreValue('No of Titles',event.target.value)}
        }
            />
            {this.state.course[0].no_of_titles.accepted ? null : <div className='error-msg'>!...this field must be between 1 and 12</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Description :</div>
            <input 
            type='text'
            value = {this.state.course[0].description.value}
            placeholder={`Enter Description`}
           onChange = {event => {
        getStoreValue('Description',event.target.value)}
        }
            />
            {this.state.course[0].description.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            </div>
       )
    }
    //To change to titles form
    const compileTitlesForm = () => {
        let template = null;
        if(this.state.place === 'titles')
        {
            template = <TitlesForm uploadTitles={this.uploadTitles} titles={this.state.course[0].titles}getBack={this.getBAck} count={this.state.course[0].no_of_titles.value} />
        } 
        else if(this.state.place === 'finish')
        {
            template = <FinishForm onRouteChange={this.props.onRouteChange} logged={this.props.logged} no = {this.state.no}getBack={this.getBAckFromfirst} course={this.state.course} />
        }
        return template
    }
   
    const compileUploadForm = () => {
        return (
            <div>
            <div className='upload-info-tab'>{CompileGetUploadInfo() }
            <div className='next-button-center'><img onClick={()=>onUploadSubmit()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
             </div></div>
        )
    }
     //To get the needed form
    return(
        
        <div className='upload-panel'>
         <div className='profile-username'>{this.props.logged}</div>
         {this.state.place === 'start' ?
         compileUploadForm()
         : compileTitlesForm()}
         </div>)
}
}
export default Upload;