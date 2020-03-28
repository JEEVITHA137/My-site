import React,{  Component}  from 'react';
import axios from  'axios';
class Teachers_panel extends Component {
    constructor() {
        super();
        this.state = {
           Teachers: [],
           searchfield : '', 
           searchOn :false,
           Logs : false,
           Teacher : [],
           Userinfo : false
        }
    }
    componentWillMount(){
        //To get all Teacherws details
        axios.get(`http://localhost:3001/academy-log/teacher-detail/all`)
        .then(response => { 
            this.setState({
                Teachers : response.data
            })
        })
    } 
    render(){
    //To change the search value in state
        const onSearchChange = (event) => {
            if(event.trim() === ''){
                this.setState({ searchOn : false })
            }
            else{
                this.setState({ searchOn : true })
            }
              this.setState({ searchfield: event })
        
          }
          //To change state to Userinfo ON/OFF
 const compileUserInfo =() => {
    this.setState({
        Userinfo: this.state.Userinfo ? false : true
    })
 }
 //To render teacher info
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
//To set back to home
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
   //To render the dashboard
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
                <div className='Courses-Heading'>Courses Uploaded : {name[0].Courses.length === 0 ? '0' : name[0].Courses.length} </div>
                {name[0].Courses.length === 0 ? null : <div>
                    {
                        name[0].Courses.map((course,i)=>{
                            return <div className='upload-teach'>{course}</div>
                        })
                    }
                </div>}
                </div>}
                </div>
            return template
        }
        //To change to Userinfo 
        const changeResult = (name) => {
            if(this.state.learner === name)
            {
                this.setState({
                   Logs : this.state.Logs ? false : true,
                   searchOn : false
                })
           
            }
            else{ 

                 let Result =this.state.Teachers.filter((learner)=>{
                return learner.Username === name
            })
             this.setState({
                 learner : Result,
                 Logs : true,
                 searchOn : false
             })
            }
        }

        //To render the search results
       const searchedUsers = () => {
        let template =null;
      let filteredUsers = this.state.Teachers.filter((learner)=>{
            return learner.Username.toLowerCase().includes(this.state.searchfield.toLowerCase().trim())
        })
        if(this.state.searchfield.toLowerCase() === 'all'){
            filteredUsers = this.state.Teachers
          }
        template = filteredUsers.map(
            (learner,i)=>{
               return <div key={i} className='learner-tag clickable' onClick={()=>changeResult(learner.Username)}>{learner.Username}</div>
            }
        )
        return template
        }
        const firstUsers = () => {
            let template =null;
            template = this.state.Teachers.slice(0,10).map(
                (learner,i)=>{
                   return <div key={i} className='learner-tag clickable' onClick={()=>changeResult(learner.Username)}>{learner.Username}</div>
                }
            )
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
            placeholder='search Teachers'
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
export default Teachers_panel;