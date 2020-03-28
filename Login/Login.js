import React, { Component } from 'react';
import './login.css';
import axios from  'axios';
class Login  extends Component {
    constructor(){
        super();
        this.state ={
            userType:'learner',
            info : {
                Username : {
                   value : '',
                   accepted : true,
                   error : ''
               },
                Password : {
                   value : '',
                   accepted : true,
                   error : ''
               }     
            },
            forget : {
                Username : {
                    value : '',
                    accepted : true,
                    error : ''
                }
                ,
                Mobile : {
                    value : '',
                    accepted : true,
                    error : ''
                }
            },
            password : {
                value : '',
                accepted : true,
                error : ''
            },
            ref : [],
            changed: false,
            learners : [],
            teachers : [],
            place : 'home'
        }
    }
    componentWillMount(){
        //To set login type 
        if(this.props.logged === 'Instructor')
        this.setState({
            userType  : 'instructor'
        })
        //To get the info about the registered users
        axios.get('http://localhost:3001/academy-log/learner-detail/all')
        .then(response => { 
            this.setState({
               learners : [...this.state.learners,...response.data]
            })
        })
        axios.get('http://localhost:3001/academy-log/teacher-detail/all')
        .then(response => { 
            this.setState({
               teachers : [...this.state.teachers,...response.data]
            })
        })
    }
    render(){
          //To store forget password values
          const getStorePasswordValue = (name,value) => {
            let trail = this.state.password;
           if(name === 'Password')
           {
               trail.value = value; 
            if(trail.value.length < 4)
               {
                   trail.accepted = false;
                   trail.error = 'Password Should be greater than 5 characters';
               }
               else if(trail.value.length > 15)
               {
                   trail.accepted = false;
                   trail.error = 'Password Should be less than 15 characters';
               }
               else 
               {        
                   trail.accepted = true;
                   trail.error = ''
               }
           }

            this.setState({
                password : trail,
                changed :true
            })
        } 
          //To store forget password values
          const getStoreForgetValue = (name,value) => {
            let trail = this.state.forget;
           if(name === 'Username')
           {
               trail.Username.value = value; 
            if(trail.Username.value.length < 3)
               {
                   trail.Username.accepted = false;
                   trail.Username.error = 'Username Should be greater than 2 characters';
               }
               else if(trail.Username.value.length > 15)
               {
                   trail.Username.accepted = false;
                   trail.Username.error = 'UserName Should be less than 15 characters';
               }
               else 
               {        
                   trail.Username.accepted = true;
                   trail.Username.error = ''
               }
           }
          else if(name === 'Mobile')
           {
               trail.Mobile.value = value; 
               if(trail.Mobile.value.match(/^[0-9]+$/) == null)
               {
                   trail.Mobile.accepted = false;
                   trail.Mobile.error = 'Mobile no Should be a number';
               }
               else if(trail.Mobile.value <= 999999999)
               {
                   trail.Mobile.accepted = false;
                   trail.Mobile.error = 'Mobile no Should be greater than 9 digits';
               }
               else if(trail.Mobile.value >= 99999999999999)
               {
                   trail.Mobile.accepted = false;
                   trail.Mobile.error = 'Mobile no Should be less than 15 digits';
               }
               else 
               {
                   trail.Mobile.accepted = true;
                   trail.Mobile.error = ''
               }
           }

            this.setState({
                forget : trail,
                changed :true
            })
        } 
        //To store values in input with validation
        const getStoreValue = (name,value) => {   
            let trail = this.state.info;
           if(name === 'Username')
           {
               trail.Username.value = value; 
            if(trail.Username.value.length < 3)
               {
                   trail.Username.accepted = false;
                   trail.Username.error = 'Username Should be greater than 2 characters';
               }
               else if(trail.Username.value.length > 15)
               {
                   trail.Username.accepted = false;
                   trail.Username.error = 'UserName Should be less than 15 characters';
               }
               else 
               {        
                   trail.Username.accepted = true;
                   trail.Username.error = ''
               }
           }
          else if(name === 'Password')
           {
               trail.Password.value = value; 
            if(trail.Password.value.length < 5)
               {
                   trail.Password.accepted = false;
                   trail.Password.error = 'Password Should be greater than 5 characters';
               }
               else if(trail.Password.value.length > 15)
               {
                   trail.Password.accepted = false;
                   trail.Password.error = 'UserName Should be less than 15 characters';
               }
               else 
               {
                   trail.Password.accepted = true;
                   trail.Password.error = ''
               }
           }

            this.setState({
                info : trail,
                changed :true
            })
         }
         //To make valid
         const proceed = () => {
            let trail = this.state.forget;
          
             if(trail.Username.value.length < 3)
                {
                    trail.Username.accepted = false;
                    trail.Username.error = 'Username Should be greater than 2 characters';
                }
                else if(trail.Username.value.length > 15)
                {
                    trail.Username.accepted = false;
                    trail.Username.error = 'UserName Should be less than 15 characters';
                }
                else 
                {        
                    trail.Username.accepted = true;
                    trail.Username.error = ''
                }
           
                if(trail.Mobile.value.match(/^[0-9]+$/) == null)
                {
                    trail.Mobile.accepted = false;
                    trail.Mobile.error = 'Mobile no Should be a number';
                }
                else if(trail.Mobile.value <= 999999999)
                {
                    trail.Mobile.accepted = false;
                    trail.Mobile.error = 'Mobile no Should be greater than 9 digits';
                }
                else if(trail.Mobile.value >= 99999999999999)
                {
                    trail.Mobile.accepted = false;
                    trail.Mobile.error = 'Mobile no Should be less than 15 digits';
                }
                else 
                {
                    trail.Mobile.accepted = true;
                    trail.Mobile.error = ''
                }
 
             this.setState({
                 forget : trail,
                 changed :true
             })

             if(this.state.forget.Username.accepted && this.state.forget.Mobile.accepted && this.state.changed )
             {
                if(this.state.userType === 'learner')
                { 
                    let satisfied =false
                  let newLearn=  this.state.learners
                    newLearn.map((learn)=>{
                        if(learn.Username === this.state.forget.Username.value && learn.Mobile === parseInt(this.state.forget.Mobile.value) )
                        {
                       
                           satisfied = true;
                        }
                        return null
                    })
                    if(satisfied)
                    {
                        this.setState({
                            place : 'password',
                            changed : false
                        })
                    }
                    else {
                        getBack()
                    }
                }
                else 
                { 
                    let satisfied =false
                    this.state.teachers.map((teach)=>{
                        if(teach.Username === this.state.forget.Username.value && teach.Mobile === parseInt(this.state.forget.Mobile.value) )
                        {
                       

                           satisfied = true;
                        }
                        return null
                    })
                    if(satisfied)
                    {
                        this.setState({
                            place : 'password',
                            changed : false
                        })
                    }
                    else {
                        getBack()
                    }
                }
             }
         }
         //To get Back
         const getBack =() =>{
            this.setState({
                info : {
                    Username : {
                       value : '',
                       accepted : true,
                       error : ''
                   },
                    Password : {
                       value : '',
                       accepted : true,
                       error : ''
                   }     
                },
                forget : {
                    Username : {
                        value : '',
                        accepted : true,
                        error : ''
                    }
                    ,
                    Mobile : {
                        value : '',
                        accepted : true,
                        error : ''
                    }
                },
                password : {
                    value : '',
                    accepted : true,
                    error : ''
                },
                changed: false,
                place : 'home'
            })
        }
         //To check the form validation and login
      const checkFormValid = () => {
        let trail = this.state.info
        if(trail.Username.value.length < 3)
        {
            trail.Username.accepted = false;
            trail.Username.error = 'Username Should be greater than 2 characters';
        }
        else if(trail.Username.value.length > 15)
        {
            trail.Username.accepted = false;
            trail.Username.error = 'UserName Should be less than 15 characters';
        }
        else 
        {
            trail.Username.accepted = true;
            trail.Username.error = ''
        }
    
        if(trail.Password.value.length < 5)
        {
            trail.Password.accepted = false;
            trail.Password.error = 'Password Should be greater than 5 characters';
        }
        else if(trail.Password.value.length > 15)
        {
            trail.Password.accepted = false;
            trail.Password.error = 'UserName Should be less than 15 characters';
        }
        else 
        {
            trail.Password.accepted = true;
            trail.Password.error = ''
        }

        this.setState({
            info : trail
        })

       if(this.state.changed && this.state.info.Username.accepted && this.state.info.Password.accepted )
        {
            let info_tile = [this.state.info];
            info_tile[0].Username = info_tile[0].Username.value;
            info_tile[0].Password = info_tile[0].Password.value;
            if(this.state.userType === 'learner')
            { 
             if(info_tile[0].Username === 'Sdian' && info_tile[0].Password === 'Sdian'){
                this.props.onRouteChange('Admin','Learner-logged')
            }
            else
            {    
                //Checking the data to be present in DB
            axios.post(`http://localhost:3001/academy/login-learner/`,info_tile[0])
                .then(res => {
                    if(res.data === true)
                    {
                       this.props.onRouteChange(info_tile[0].Username,'Learner-logged')
                    }
                    else{
                        let constInfo = {
                            Username : {
                               value : !res.data ? info_tile[0].Username : '',
                               accepted : !res.data ? info_tile[0].Username : false,
                               error : !res.data ? info_tile[0].Username : 'Username not found'
                           },
                            Password : {
                               value : !res.data ? info_tile[0].Password : '',
                               accepted : !res.data ? false : true,
                               error : !res.data ? 'Password incorrect' : ''
                           }     
                        }
                        this.setState({
                            info : constInfo,
                            changed : false
                        })
                    }
                  })
                }
            }
            
            else if(this.state.userType === 'instructor')
            {
                 axios.post(`http://localhost:3001/academy/login-teacher/`,info_tile[0])
                 .then(res => {
                   if(res.data === true)
                    {
                        this.props.onRouteChange(info_tile[0].Username,'Instructor-logged')
                    } 
                    else{
                        let constInfo = {
                            Username : {
                               value : !res.data ? info_tile[0].Username : '',
                               accepted : !res.data ? info_tile[0].Username : false,
                               error : !res.data ? info_tile[0].Username : 'Username not found'
                           },
                            Password : {
                               value : !res.data ? info_tile[0].Password : '',
                               accepted : !res.data ? false : true,
                               error : !res.data ? 'Password incorrect' : ''
                           }     
                        }
                        this.setState({
                            info : constInfo,
                            changed : false
                        })
                    }
                  })
            }
        }
      }
const proceedWithPassword = () => {
    if( this.state.userType === 'learner')
    {
        axios.get(`http://localhost:3001/academy-log/learner-detail/?username=${this.state.forget.Username.value}`)
        .then(response => { 
           this.setState({
               ref : response.data
           })
        })
        let newLearner = this.state.learners.filter((learn)=>{
            return learn.Username === this.state.forget.Username.value
        })
        newLearner[0].Password = this.state.password.value
    axios.post(`http://localhost:3001/academy-log/learner-profile/remove/?username=${this.state.forget.Username.value}`,this.state.forget.Username.value)
    .then(res => {
        if(res.data)
        {
            axios.post(`http://localhost:3001/academy-log/learner-profile/change/`,newLearner[0])
        }
      })

      axios.post(`http://localhost:3001/academy/learner-profile/remove/?username=${this.state.forget.Username.value}`,this.state.forget.Username.value)
      .then(res => {
          if(res.data)
          {
              axios.post(`http://localhost:3001/academy/signin-learner`,newLearner[0])
          }
        })
    }
    else  {
        axios.get(`http://localhost:3001/academy-log/teacher-detail/?username=${this.state.forget.Username.value}`)
        .then(response => { 
           this.setState({
               ref : response.data
           })
        })
        let newTeacher = this.state.teachers.filter((teach)=>{
            return teach.Username === this.state.forget.Username.value
        })
        newTeacher[0].Password = this.state.password.value
    axios.post(`http://localhost:3001/academy-log/teacher-profile/remove/?username=${this.state.forget.Username.value}`,this.state.forget.Username.value)
    .then(res => {
        if(res.data)
        {
            axios.post(`http://localhost:3001/academy-log/teacher-profile/change/`,newTeacher[0])
        }
      })

      axios.post(`http://localhost:3001/academy/teacher-profile/remove/?username=${this.state.forget.Username.value}`,this.state.forget.Username.value)
      .then(res => {
          if(res.data)
          {
              axios.post(`http://localhost:3001/academy/signin-teacher`,newTeacher[0])
          }
        })
    }
    getBack()
   }
//To change user type
        const changeUserId = (newid) => {           
     this.setState({userType : newid});
        }
        const CompileGetUserInfo = () => {
           return (<div>
            <div className='user-info-comp'>
            <div className='user-info'>Username :</div>
            <input 
            type='text'
            value= {this.state.info.Username.value || ''}
            placeholder={`Enter your Username`}
            onChange = {event => {
                getStoreValue('Username',event.target.value)}
                }
            />   
            </div>
            {this.state.info.Username.accepted ? null : <div className='error-msg'>{this.state.info.Username.error}</div>}
            <div className='user-info-comp'>
            <div className='user-info'>Password :</div>
            <input 
            type='password'
            value= {this.state.info.Password.value || ''}
            placeholder={`Enter your Password`}
            onChange = {event => {
                getStoreValue('Password',event.target.value)}
                }
            />
            </div>
            {this.state.info.Password.accepted ? null : <div className='error-msg'>{this.state.info.Password.error}</div>}
            </div>)
        }
        
        const changeToForget =() => {
            this.setState({
                place : 'forget'
            })
        }
      const compileForgetPassword = () =>{
          return (<div>{this.state.place === 'password' ? <div>
          
          <div className='user-info-comp'>
          <div className='user-info'>Password :</div>
          <input 
          type='password'
          value= {this.state.password.value || ''}
          placeholder={`Enter your Password`}
          onChange = {event => {
              getStorePasswordValue('Password',event.target.value)}
              }
          />
          </div>
          {this.state.password.accepted ? null : <div className='error-msg'>{this.state.password.error}</div>}
          <div className='lower-buttons'>
            <div className='prev'><img onClick={()=>getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            <div className='next'><img onClick={()=>proceedWithPassword()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
          </div>
          </div>:<div>
            <div className='user-info-comp'>
            <div className='user-info'>Username :</div>
            <input 
            type='text'
            value= {this.state.forget.Username.value || ''}
            placeholder={`Enter your Username`}
            onChange = {event => {
                getStoreForgetValue('Username',event.target.value)}
                }
            />   
            </div>
            {this.state.forget.Username.accepted ? null : <div className='error-msg'>{this.state.forget.Username.error}</div>}
            <div className='user-info-comp'>
            <div className='user-info'>Mobile :</div>
            <input 
            type='text'
            value= {this.state.forget.Mobile.value || ''}
            placeholder={`Enter your Mobile`}
            onChange = {event => {
                getStoreForgetValue('Mobile',event.target.value)}
                }
            />
            </div>
            {this.state.forget.Mobile.accepted ? null : <div className='error-msg'>{this.state.forget.Mobile.error}</div>}
            <div className='lower-buttons'>
            <div className='prev'><img onClick={()=>getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            <div className='next'><img onClick={()=>proceed()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
          </div>
            </div>}</div>)
      }

        //To compile the form
        const compileLoginForm = () => {
            return (
                <div>{this.state.place === 'password' ? null:
                <div className='login-id'>
                 <div className={this.state.userType==='learner' ? 'login-comp-dark' : 'login-comp-light'} onClick={() => changeUserId('learner')}>Learner</div> 
                 <div className={this.state.userType==='instructor' ? 'login-comp-dark' : 'login-comp-light'} onClick={() => changeUserId('instructor')}>Instructor</div>
                 </div>}
                 {this.state.place === 'home' ? 
                <div className='login-info-tab'>{CompileGetUserInfo() }
                <div className='forget' onClick={()=>changeToForget()}>Forgot Password?</div>
                <div className='submit-button to-last'>
                <img alt='Login' onClick={()=>checkFormValid()}  style={{width:90 ,height:50 }}  src={require('../photos/Login.png')} />
                <img alt='Sign up' onClick={() => this.props.onRouteChange('signup','Link')} style={{width:90 ,height:50 }}  src={require('../photos/Signup.png')} />
                </div>
                </div>: <div className='login-info-tab'>{compileForgetPassword()}</div>}</div>
            )
        }
return(
    <div className='Login-panel'>
 {compileLoginForm()  }
    </div>
)
}}
export default Login;