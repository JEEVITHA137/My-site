import React, { Component } from 'react';
import SubName from './subject-name';
import CourseName from './course-name';
import VideoPlayer from './video-player';
import './title.css';
import axios from  'axios';

class Title extends Component {
    constructor() {
        super();
        this.state = {
            video : 'OFF',
            Url : '',
            titles: '',
            First : [
                {
                    Courses : []
                }
            ]
        }
    }
    componentDidMount(){ 
        //To get the details of the course
        axios.get(`http://localhost:3001/academy/course?course=${this.props.cour}`)
        .then(response => { 
            this.setState({
                titles : response.data[0].titles
            })
        })
   if(this.props.logged === 'Learner' && this.props.loggedIn !== 'Admin'){
       //To get the details of the logged learner
    axios.get(`http://localhost:3001/academy-log/learner-detail/?username=${this.props.loggedIn}`)
    .then(response => { 
        let newRay = response.data;
    
      this.setState({
          First : [...newRay]
      })
    })
   }
    }
    render(){ 
        //To filter the title selected
        let filteredTitle = []
        if(this.state.titles.length !== 0)  {
            filteredTitle = this.state.titles.filter(title =>{
                return (
                   title.title === this.props.title
                );
                })
}
//To shuffle the quiz questions
const shuffle =arr => arr
.map(a => [Math.random(), a])
.sort((a, b) => a[0] - b[0])
.map(a => a[1]);

const compileTitle = () => {
  
    return (<div>
        {
            filteredTitle[0].videos.map((video, i) => {
            return (
                <div  key={i} >
                <div className='videos-list' >
                <div className='video-play' onClick={() => onVideoRoute(video.URL,video.video)}>
                <img alt='videos' style={{width:55 ,height:40 }}  src={require('../photos/video preview.png')} />
               <div className='video-list-name'> <h4>{video.video}</h4></div></div>
                <div className='practise'>{video.quiz ? 
                    <img alt='videos' onClick={() => this.props.onRouteChange(this.props.sub,'Quiz',this.props.cour,filteredTitle[0].title,video.video,shuffle(video.quiz))} style={{width:50 ,height:40 }}  src={require('../photos/practice.png')} />
                   : null}</div>
                </div>
                { this.state.video === 'ON' && this.state.Url === video.URL ?
                <div className='video-on'><VideoPlayer Url={video.URL}/><div className='desc gap'>Description :<br/><br/>{video.description}</div></div> : null}
                </div>
            )
        })}</div>
    )
}
//To save the video watched in the learners log
const saveVideo = (name) => {
    let total = 0
    this.state.titles.map((title)=>{
       total= total + title.videos.length
       return null
    }

    )
    let NewData = this.state.First[0].Courses;
     if(NewData.length === 0)
     {
         let Data = {
            name : this.props.cour,
            videos : [],
            quiz : [],
            completed : 0
         }
          let videos = []
         videos = [...videos,name]
         Data.completed = Math.ceil((videos.length/total )*100)
         Data.videos = videos
         NewData = [...NewData,Data]
     }
     else {
         let MyCourse = NewData.filter(course =>{
             return course.name === this.props.cour
         })
         if(MyCourse.length === 0)
         {
            let Data = {
                name : this.props.cour,
                videos : [],
                quiz : [],
                completed : 0
             }
             let videos = []
             videos = [...videos,name]
             Data.completed = Math.ceil((videos.length/total )*100)
             Data.videos = videos
             NewData = [...NewData,Data]
         }
         else{
             NewData.map((course)=>{
                 if(course.name === this.props.cour)
                 {
                     let myvideo = course.videos.filter((video)=>{
                         return video === name
                     })
                     if(myvideo.length === 0)
                     {
                         course.videos = [...course.videos,name]
                         course.completed = Math.ceil((course.videos.length/total )*100)
                     }
                 }
                 return  null;
             })
         }
     }
     let NewFirst = this.state.First;
     NewFirst[0].Courses = NewData;
     axios.post(`http://localhost:3001/academy-log/learner-profile/remove/?username=${this.props.loggedIn}`,NewFirst[0])
     .then(res => {
         if(res.data)
         {
             axios.post(`http://localhost:3001/academy-log/learner-profile/change/`,NewFirst[0])
         }
       })
}
//To set video ON/OFF
const onVideoRoute = (gonext,vid) => {
    if(this.state.video === 'OFF')
    {
        this.setState({
        video : 'ON',
        Url : gonext
       });
       if(this.props.logged === 'Learner'  && this.props.loggedIn !== 'Admin')
       {
       saveVideo(vid);
       }
    } 
    else
    {
        this.setState({
            video : 'OFF',
            Url : ''
        });
    }
    
}

    return (
        <div className='title-card'> 
      
        {
            this.state.titles !== '' ?   <div>  <div className='upper-tags'>
        <SubName onRouteChange={this.props.onRouteChange} sub={this.props.sub}/>
        <div className='second-tag'>
        <CourseName onRouteChange={this.props.onRouteChange} sub={this.props.sub} cour={this.props.cour}/>
        <div className='course-title-name' ><h4>{filteredTitle[0].title}</h4> 
       </div></div></div>
       {
            this.state.titles !== '' ?   compileTitle() : null}</div>: null}
        </div>
        )}
}
export default Title;