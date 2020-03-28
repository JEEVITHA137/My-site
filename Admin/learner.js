import React,{  Component} from 'react';
import axios from  'axios';
import './learner.css';
import GraphChart from '../subjects/graph';
import Piechart from '../subjects/piechart';
class Learners_panel extends Component {
    constructor() {
        super();
        this.state = {
           Learners: [],
           searchfield : '', 
           searchOn :false,
           Details : false,
           Logs : false,
           learner : [],
           Course : '',
           Userinfo : false
        }
    }
    componentWillMount(){
        //To get all learners details
        axios.get(`http://localhost:3001/academy-log/learner-detail/all`)
        .then(response => { 
            this.setState({
                Learners : response.data
            })
        })
    } 
    render(){
       //To change state when search changes
        const onSearchChange = (event) => {
            if(event.trim() === ''){
                this.setState({ searchOn : false })
            }
            else{
                this.setState({ searchOn : true })
            }
              this.setState({ searchfield: event })
        
          }
   //To change course in state when any course is clicked
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

        //To change state Learnerinfo ON/OFF
 const compileUserInfo =() => {
    this.setState({
        Userinfo: this.state.Userinfo ? false : true
    })
 }
 //To render the Learners details 
 const compileInfo =(user) => {
     return (
         <div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Name :  </div>
         <div className='Courses-Heading'>{user[0].Name} </div></div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Age :  </div>
         <div className='Courses-Heading'>{user[0].Age} </div></div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Gender :  </div>
         <div className='Courses-Heading'>{user[0].Gender} </div></div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Bio :  </div>
         <div className='Courses-Heading'>{user[0].Bio} </div></div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Email :  </div>
         <div className='Courses-Heading'>{user[0].Email} </div></div>
         <div className='user-tile'>
         <div className='Courses-Heading'> Mobile :  </div>
         <div className='Courses-Heading'>{user[0].Mobile} </div></div>
         </div>
     )
 }
  //To change the state back to start
   const changeback =() => {
       this.setState({
        searchfield : '', 
        searchOn :false,
        Details : false,
        Logs : false,
        learner : [],
        Course : '',
        Userinfo : false
     })
   }

     //To compile what to render as per state of Userinfo
        const compileDashboard = (name) => {
       let template =null
            template =
                <div >
                <div className='button'>
                <button onClick={()=>changeback()} >Back</button></div>
                <div className='profile-username clickable' onClick={()=>compileUserInfo()}>{name[0].Username}</div>
              {this.state.Userinfo ? <div>
                {
                    compileInfo(name)
                }
                </div> :
                <div className='dashboard-user'>
                <div className='Courses-Heading'>Courses on Progress : {name[0].Courses.length === 0 ? '0' : name[0].Courses.length} </div>
                {
                    name[0].Courses.length === 0 ? 
                    null : <div>
                    {name[0].Courses.map((course,i)=>{
                        return(
                            <div key={i}>
                        <div className='Courses-Heading  clickable' onClick={()=>changeCourse(course.name)}>Course : {course.name}</div>
                        <GraphChart limit={course.completed} />
                        {this.state.Details && this.state.Course === course.name ? <div className='Courses-Heading'>Quiz</div>: null}
                        {this.state.Details && this.state.Course === course.name ? <div className='Course-Details'>{compileCourseDetails(course)}</div>: null}
                      
                        </div>
                       
                        )
                    })
                   
                    }</div>}
                </div>}
                </div>
            return template
        }

        //To change to view learnerInfo
        const changeResult = (name) => {
            if(this.state.learner === name)
            {
                this.setState({
                   Logs : this.state.Logs ? false : true,
                   searchOn : false
                })
           
            }
            else{ 

                 let Result =this.state.Learners.filter((learner)=>{
                return learner.Username === name
            })
             this.setState({
                 learner : Result,
                 Logs : true,
                 searchOn : false
             })
            }
        }
        //To render the results of search
       const searchedUsers = () => {
        let template =null;
      let filteredUsers = this.state.Learners.filter((learner)=>{
            return learner.Username.toLowerCase().includes(this.state.searchfield.toLowerCase().trim())
        })
        if(this.state.searchfield.toLowerCase() === 'all'){
            filteredUsers = this.state.Learners
          }
        template = filteredUsers.map(
            (learner,i)=>{
               return <div key={i} className='learner-tag clickable' onClick={()=>changeResult(learner.Username)}>{learner.Username}</div>
            }
        )
        return template
        }
        
        //TO render the list of Learners
        const firstUsers = () => {
            let template =null;
            template = this.state.Learners.slice(0,10).map(
                (learner,i)=>{
                   return <div key={i} className='learner-tag clickable' onClick={()=>changeResult(learner.Username)}>{learner.Username}</div>
                }
            )
            return template
        }

        //To render the dashboard detailed of selected users
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
        return (
            <div className='total-learner'>  <div>
             <input 
            type='search' 
            className='search-tag'
            value = {this.state.searchfield}
             onChange = {event => {
               onSearchChange(event.target.value)}
                }
            placeholder='search Learners'
            />
          {
          this.state.searchOn ? <div>{searchedUsers()}</div>
        : <div>
        {this.state.Logs ?
             <div> {compileDashboard(this.state.learner)}</div> :
        <div>{firstUsers()}</div>}</div>
        }

            </div> </div>
        )
    }
}
export default Learners_panel;