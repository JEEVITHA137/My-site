import React,{ Component } from 'react';
import VideoPlayer from '../subjects/video-player';
import axios from  'axios';
class EditCourse extends Component {
    constructor(){
        super();
        this.state={
            course : '',
            title : '',
            video : '',
            subject : [],
            place : 'course',
            Edit : false,
            Editing : '',
            error : '',
            teachers : [],
            teacher  : [],
            changed : false
        }
    }
    componentWillMount(){
        this.setState({
            course : this.props.course
        })
          //To get the Subject details
          axios.get('http://localhost:3001/academy/subjects')
          .then(response => { 
              let newRay = response.data;
              this.setState({
                 subject : newRay
              })
          })
        if( this.props.function === 'new-course' )
        {
        //To gets the Teachers Details
        axios.get(`http://localhost:3001/academy-log/teacher-detail/all`)
        .then(response => { 
            this.setState({
                teachers : response.data
            })
        })
      
    }
else if(this.props.function === 'change-course'){
    axios.get(`http://localhost:3001/academy-log/teacher-detail/?username=${this.props.course.Username}`)
    .then(response => { 
        this.setState({
            teacher : response.data
        })
    })

}

    }
    render(){


     const CommitChanges = () =>{
        if( this.props.function === 'edit-course' )
        {
         let data = {
            Username : this.props.logged,
            course: this.state.course.course,
            subject:  this.state.course.subject,
            description: this.state.course.description,
            titles: this.state.course.titles
            }
        axios.post(`http://localhost:3001/academy/change-course/remove`,data)
        axios.post(`http://localhost:3001/academy/change-course`,data)
        this.props.comeBack()
     }
     else if( this.props.function === 'new-course' )
     {
            //To check the subject already exist 
            let newSub =[]
            this.state.subject.map((sub)=>{
               if(sub.subject === this.state.course.subject)
               {
               newSub = [...newSub,sub]
               }
               return null
           })
            if(newSub.length === 0)
            {
            this.setState({
                error : 'Please include the Subject First.!!!'
            })
            }
            else {

                //To remove the course request data
            axios.post(`http://localhost:3001/academy/new-course/remove/?course=${this.state.course.course}`,this.state.course)
            
            //To add the new course
            axios.post(`http://localhost:3001/academy/course`,this.state.course)
          
            //To update the subject data
            let newCourse =[]
             this.state.subject.map((sub)=>{
                if(sub.subject === this.state.course.subject)
                {
                newCourse = [...sub.courses]
                }
                return null
            })
            let newl = {
                name  : this.state.course.course,
                description : this.state.course.description
            }
        
          newCourse = [...newCourse,newl];

            axios.post(`http://localhost:3001/academy/subjects/change?subject=${this.state.course.subject}`,newCourse)
         
           axios.get(`http://localhost:3001/academy/new-course`)
           .then(response => { 
               this.setState({
                   courses : response.data
               })
           })

        
           axios.get(`http://localhost:3001/academy-log/teacher-detail/?username=${this.state.course.Username}`)
           .then(response => { 
              this.setState({
                  teacher :  response.data
              })
           })
           let newTeach = this.state.teachers.filter((teach)=>{
                return teach.Username === this.state.course.Username
         
            })
            newTeach[0].Courses = [...newTeach[0].Courses,this.state.course]
            axios.post(`http://localhost:3001/academy-log/teacher-profile/update/`,newTeach[0])
            this.props.onRouteChange('Home','Link')
        } 
       
     }
     else if(this.props.function === 'change-course')
      {
          let newTeacher = this.state.teacher
             newTeacher[0].Courses.map((course,i)=>{
                 if(course.course === this.state.course.course)
                 {
                    newTeacher[0].Courses[i] = this.state.course
                 }
                 return null
             })
          //To remove the course request data
      axios.post(`http://localhost:3001/academy/course/remove/?course=${this.state.course.course}`,this.state.course)
      axios.post(`http://localhost:3001/academy/course`,this.state.course)
     //To update the subject data
     let newCourse =[]
     this.state.subject.map((sub)=>{
        if(sub.subject === this.state.course.subject)
        {
        newCourse = [...sub.courses]
        }
        return null
    })
    newCourse.map((sub,i)=>{
        if(sub.name === this.state.course.course)
        {
            newCourse[i].description = this.state.course.description
        }
        return null
    })

    axios.post(`http://localhost:3001/academy/subjects/change?subject=${this.state.course.subject}`,newCourse)
          axios.post(`http://localhost:3001/academy-log/teacher-profile/remove/?username=${newTeacher[0].Username}`,newTeacher[0])
          .then(res => {
              if(res.data)
              {
                  axios.post(`http://localhost:3001/academy-log/teacher-profile/change/`,newTeacher[0])
              }
            })
            axios.post(`http://localhost:3001/academy/change-course/remove/?course=${this.state.course.course}`,this.state.course)
            this.props.onRouteChange('Home','Link')
     }
    }


        const changeToVideo =(data) => {
            this.setState({
                place :'video',
                video : data
            })
        }
        const changeToTitle =(data) => {
            this.setState({
                place :'title',
                title : data
            })
        }
        const changePlace = (data) => {
            this.setState({
                place : data
            })
        }
        const changeToEdit = (data) => {
         this.setState({
             Editing : data
         })
        }
    const getEdit =(name,value,title,video,no,opt) => {
        if(name=== 'Course-Name')
        {
            if(value.length < 3 || value.length > 30)
            {
                this.setState({
                    error : 'Course name should have 3 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.course = value
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
       else if(name=== 'Course-Subject')
        {
            if(value.length < 3 || value.length > 30)
            {
                this.setState({
                    error : 'Course subject should have 4 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.subject = value
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Course-Description')
        {
            if(value.length < 15 || value.length > 400)
            {
                this.setState({
                    error : 'Course description should have 15 - 400 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.description = value
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Course-Title')
        {
            if(value.length < 3 || value.length > 30)
            {
                this.setState({
                    error : 'Course title should have 3 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                      titled.title = value  
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                title : value,
                changed : true
                })
            }
        }
        else if(name=== 'Course-Video')
        {
            if(value.length < 3 || value.length > 30)
            {
                this.setState({
                    error : 'Video name should have 3 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            {
                                vid.video = value
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                video : value,
                changed : true
                })
            }
        }
        else if(name=== 'Video-URL')
        {
            if(value.length < 3 || value.length > 15)
            {
                this.setState({
                    error : 'Video URL should have 3 - 15 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            {
                                vid.URL = value
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Video-Description')
        {
            if(value.length < 15 || value.length > 400)
            {
                this.setState({
                    error : 'Video description should have 15 - 400 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            {
                                vid.description = value
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Quiz-Ques')
        {
            if(value.length < 5 || value.length > 30)
            {
                this.setState({
                    error : 'Quiz Question should have 5 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            {
                                vid.quiz[no].question = value
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Quiz-Opt')
        {
            if(value.length < 1 || value.length > 30)
            {
                this.setState({
                    error : 'Quiz Option should have 1 - 30 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            { 
                                if(opt === '1')
                                {
                                vid.quiz[no].q1 = value
                                }
                                else if(opt === '2')
                                {
                                vid.quiz[no].q2 = value
                                }
                                else if(opt === '3')
                                {
                                vid.quiz[no].q3 = value
                                }
                                else if(opt === '4')
                                {
                                vid.quiz[no].q4 = value
                                }
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
        else if(name=== 'Quiz-Answer')
        {
            if(value !== '1' && value !== '2' && value !== '3' && value !== '4')
            {
                this.setState({
                    error : 'Quiz Option should be  1 - 4 characters'
                })
            }
            else {
                let Course = this.state.course
                Course.titles.map((titled)=>{
                    if(titled.title === title)
                    {
                        titled.videos.map((vid)=>{
                            if(vid.video === video)
                            {  
                                vid.quiz[no].answer = value    
                            }
                            return null
                        })
                    }
                    return null
                })
                this.setState({
                course : Course,
                error : '',
                Editing : '',
                changed : true
                })
            }
        }
    }
        const compileEditCourse = () => {
            let template = null;
            if(this.state.place === 'course')
            {
                template = <div>
                <div className='back-head clickable' onClick={()=> this.props.comeBack()} >Get Back to Dashboard</div>
                {this.props.function === 'edit-course'  ? null:<div className='back-head clickable' onClick={()=> CommitChanges()} >Save the course</div>}
                {!this.state.changed || this.props.function !== 'edit-course' ? null:<div className='back-head clickable' onClick={()=> CommitChanges()} >Save the changes</div>}
                <div className='course-name-id'>
                <div className='course-name-info'>Course :</div>
                <div className='course-name-info'>{this.state.course.course}</div>
                </div>
                <div className='course-name-id'>
                <div className='course-name-info'>Subject :</div>
                <div className='course-name-info'>{this.state.course.subject}</div>
                {this.state.Editing !== 'Course-Subject' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Course-Subject')} >Edit</div>:
                <input type='text' placeholder={'Enter subject name'}  
                 onKeyPress ={event => {
                    if (event.key === 'Enter'){
                     getEdit('Course-Subject',event.target.value)
                    }
                }}/>            
            }
                </div>
                <div className='course-name-id'>
                <div className='course-name-info'>Description :</div>
                <div className='course-name-info'>{this.state.course.description}</div>
                {this.state.Editing !== 'Course-Description' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Course-Description')} >Edit</div>:
                <input type='text' placeholder={'Enter course description'}  
                 onKeyPress ={event => {
                    if (event.key === 'Enter'){
                     getEdit('Course-Description',event.target.value)
                    }
                }}/>            
            }
                </div>
                <div>
                <div className='course-name-info'>Titles :</div>
                {this.state.course.titles.map((title,i)=>{
                    return (<div key={i} >
                      <div className='course-name-info clickable make-the-title' onClick={()=>changeToTitle(title.title)}>{title.title}</div>
                      </div>)
                })}
                </div>
                </div>
            }
            else if (this.state.place === 'title')
            {
                let ChangeTitle = this.state.course.titles.filter((title)=>{
                    return title.title === this.state.title
                })
                template= <div>
                <div className='back-head clickable' onClick={()=> changePlace('course')}>Get Back to Course</div>
                <div className='course-name-id'>
                <div className='course-name-info'>Title Name :</div>
                <div className='course-name-info'>{this.state.title}</div>
                {this.state.Editing !== 'Course-Title' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Course-Title')} >Edit</div>:
                <input type='text' placeholder={'Enter title name'}  
                 onKeyPress ={event => {
                    if (event.key === 'Enter'){
                     getEdit('Course-Title',event.target.value,this.state.title)
                    }
                }}/>            
            }
                </div>
                     <div className='course-name-info'>videos :</div>
                      {
                          ChangeTitle[0].videos.map((video,i)=>{
                            return (<div key={i} >
                                <div className='course-video-info clickable' onClick={() => changeToVideo(video.video)}>{video.video}</div>
                                </div>)
                          })
                      }
                    </div>
            }
            else if(this.state.place === 'video')
            {
                let ChangeTitle = this.state.course.titles.filter((title)=>{
                    return title.title === this.state.title
                })
                let ChangeVideo = ChangeTitle[0].videos.filter((vid)=>{
                    return vid.video === this.state.video
                })
             template = <div>
             <div className='back-head clickable' onClick={()=> changePlace('title')}>Get Back to Title</div>   
             <div className='course-name-id'>
             <div className='course-name-info'>Video Name :</div>
             <div className='course-name-info'>{this.state.video}</div>
             {this.state.Editing !== 'Course-Video' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Course-Video')} >Edit</div>:
             <input type='text' placeholder={'Enter Video name'}  
              onKeyPress ={event => {
                 if (event.key === 'Enter'){
                  getEdit('Course-Video',event.target.value,this.state.title,this.state.video)
                 }
             }}/>            
         }
             </div>
             <div className='course-name-id'>
             <div className='course-name-info'>Video URL :</div>
             <div className='course-name-info'>{ChangeVideo[0].URL}</div>
             {this.state.Editing !== 'Video-URL' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Video-URL')} >Edit</div>:
             <input type='text' placeholder={'Enter Video url'}  
              onKeyPress ={event => {
                 if (event.key === 'Enter'){
                  getEdit('Video-URL',event.target.value,this.state.title,this.state.video)
                 }
             }}/>            
         }
             </div>
             <div className='course-name-id'>
             <div className='course-name-info'>Video Description :</div>
             <div className='course-name-info'>{ChangeVideo[0].description}</div>
             {this.state.Editing !== 'Video-Description' ? <div className='course-name-info clickable' onClick={()=>changeToEdit('Video-Description')} >Edit</div>:
             <input type='text' placeholder={'Enter Video url'}  
              onKeyPress ={event => {
                 if (event.key === 'Enter'){
                  getEdit('Video-Description',event.target.value,this.state.title,this.state.video)
                 }
             }}/>            
         }
             </div>
                 <div className='video-play'> <VideoPlayer Url={ChangeVideo[0].URL}/>
                 </div>
                 <div className='course-name-info'>
                 {ChangeVideo[0].quiz ? 
                    <div> {ChangeVideo[0].quiz.map((ques,i)=>{
                     return (<div key={i}>
                         <div className='course-name-id'>
                         <div className='course-name-info'>{i + 1}. Question :</div>
                         <div className='course-name-info'>{ques.question}</div>
                         {this.state.Editing !== `Quiz-Ques-${i + 1}` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Ques-${i + 1}`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Ques`,event.target.value,this.state.title,this.state.video,`${i}`)
                             }
                         }}/>            
                     }
                         </div> 
                         <div className='course-name-id'>
                         <div className='course-name-info'>Option 1 :</div>
                         <div className='course-name-info'>{ques.q1}</div>
                         {this.state.Editing !== `Quiz-Opt-${i + 1}1` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Opt-${i + 1}1`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Opt`,event.target.value,this.state.title,this.state.video,`${i}`,'1')
                             }
                         }}/>            
                     }</div>
                         <div className='course-name-id'>
                         <div className='course-name-info'>Option 2 :</div>
                         <div className='course-name-info'>{ques.q2}</div>
                         {this.state.Editing !== `Quiz-Opt-${i + 1}2` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Opt-${i + 1}2`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Opt`,event.target.value,this.state.title,this.state.video,`${i}`,'2')
                             }
                         }}/>            
                     }</div>
                         <div className='course-name-id'>
                         <div className='course-name-info'>Option 3 :</div>
                         <div className='course-name-info'>{ques.q3}</div>
                         {this.state.Editing !== `Quiz-Opt-${i + 1}3` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Opt-${i + 1}3`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Opt`,event.target.value,this.state.title,this.state.video,`${i}`,'3')
                             }
                         }}/>            
                     }</div>
                         <div className='course-name-id'>
                         <div className='course-name-info'>Option 4 :</div>
                         <div className='course-name-info'>{ques.q4}</div>
                         {this.state.Editing !== `Quiz-Opt-${i + 1}4` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Opt-${i + 1}4`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Opt`,event.target.value,this.state.title,this.state.video,`${i}`,'4')
                             }
                         }}/>            
                     }</div>
                         <div className='course-name-id'>
                         <div className='course-name-info'>Answer :</div>
                         <div className='course-name-info'>{ques.answer}</div>
                         {this.state.Editing !== `Quiz-Answer-${i + 1}` ? <div className='course-name-info clickable' onClick={()=>changeToEdit(`Quiz-Answer-${i + 1}`)} >Edit</div>:
                         <input type='text' placeholder={'Enter Video url'}  
                          onKeyPress ={event => {
                             if (event.key === 'Enter'){
                              getEdit(`Quiz-Answer`,event.target.value,this.state.title,this.state.video,`${i}`)
                             }
                         }}/>            
                     }</div>
                         </div>)
                 })}</div> : null
             }
                 </div>
                 </div>
            }
            return template
        }
        return (<div>
            {this.state.error === '' ? null : <div className='error-msg'>{this.state.error}</div>}
             {compileEditCourse()}
            </div>)
    }
}
export default EditCourse