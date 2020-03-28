import React, { Component } from 'react';
import './signup.css';
import axios from  'axios';
class Signup  extends Component {
    constructor(){
        super();
        this.state ={
            userType:'learner',
            info : {
                    Name : {
                       value : '',
                       accepted : true,
                       error : ''
                   },
                    Username : {
                       value : '',
                       accepted : true,
                       error : ''
                   },
                    Password : {
                       value : '',
                       accepted : true,
                       error : ''
                   },
                   Mobile : {
                    value : null,
                    accepted : true,
                    error : ''
                }
                   
                },
                changed: false,
                users: []
            
        }
    }
    componentWillMount(){
//To get the info about the registered users
        axios.get('http://localhost:3001/academy-log/user-learners')
        .then(response => { 
            this.setState({
               users : [...this.state.users,response.data]
            })
        })
        axios.get('http://localhost:3001/academy-log/user-teachers')
        .then(response => { 
            this.setState({
               users : [...this.state.users,response.data]
            })
        })
    }
    render(){
        //To check input validation
        const validuser = (value,type) => {  
            if(value === 'none' || value === 'Sdian' || value === 'Admin')
            {
               return false;
            }
            else {
                let trail = this.state.users;
           if(this.state.userType === 'learner')
           {
               trail = [...trail[0]];
           }
           if(this.state.userType === 'instructor')
           {
               trail = [...trail[1]];
           }
        for(let i=0;i<trail.length;i++ ){
             if(type==='Username'){
             if(trail[i].Username === value){
                 return false;
             }
            }
            else if(type==='Mobile'){
                if(trail[i].Mobile === parseInt(value)){
                    return false;
                }
               }
         }
         return true;
        }
        }
        //To store the value in state with validation
        const getStoreValue = (name,value) => {   
            let trail = this.state.info;
           if(name === 'Name')
           {
               trail.Name.value = value; 
            if(trail.Name.value.length < 3)
               {
                   trail.Name.accepted = false;
                   trail.Name.error = 'Name Should be greater than 2 characters';
               }
               else if(trail.Name.value.length > 20)
               {
                   trail.Name.accepted = false;
                   trail.Name.error = 'Name Should be less than 20 characters';
               }
               else 
               {
                   trail.Name.accepted = true;
                   trail.Name.error = ''
               }
           }
          else if(name === 'Username')
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
                   if(validuser(trail.Username.value,'Username'))
                   {
                   trail.Username.accepted = true;
                   trail.Username.error = ''
                   }
                   else{        
                   trail.Username.accepted = false;
                   trail.Username.error = 'Username already exists...!';
                   }
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
                   if(validuser(trail.Mobile.value,'Mobile'))
                   {
                   trail.Mobile.accepted = true;
                   trail.Mobile.error = ''
                   }
                   else{        
                   trail.Mobile.accepted = false;
                   trail.Mobile.error = 'Mobile no already Registered...!';
                   }
               }
           }

            this.setState({
                info : trail,
                changed :true
            })
         }
//To final check when signup is clicked and signup
      const checkFormValid = () => {
        let trail = this.state.info
        if(trail.Name.value.length < 3)
        {
            trail.Name.accepted = false;
            trail.Name.error = 'Name Should be greater than 2 characters';
        }
        else if(trail.Name.value.length > 20)
        {
            trail.Name.accepted = false;
            trail.Name.error = 'Name Should be less than 20 characters';
        }
        else 
        {
            trail.Name.accepted = true;
            trail.Name.error = ''
        }

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
            if(validuser(trail.Username.value,'Username'))
            {
            trail.Username.accepted = true;
            trail.Username.error = ''
            }
            else{        
            trail.Username.accepted = false;
            trail.Username.error = 'Username already exists...!';
            }
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
        if(trail.Mobile.value === null)
        {
            trail.Mobile.accepted = false;
            trail.Mobile.error = 'Mobile no should be filled';
        }
        else if(trail.Mobile.value !== null && trail.Mobile.value.match(/^[0-9]+$/) == null)
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
            if(validuser(trail.Mobile.value,'Mobile'))
            {
            trail.Mobile.accepted = true;
            trail.Mobile.error = ''
            }
            else{        
            trail.Mobile.accepted = false;
            trail.Mobile.error = 'Mobile no already Registered...!';
            }
        }
        this.setState({
            info : trail
        })

       if(this.state.changed && this.state.info.Username.accepted && this.state.info.Password.accepted && this.state.info.Mobile.accepted && this.state.info.Name.accepted )
        {
            let info_tile = [this.state.info];
            info_tile[0].Name = info_tile[0].Name.value;
            info_tile[0].Username = info_tile[0].Username.value;
            info_tile[0].Password = info_tile[0].Password.value;
            info_tile[0].Mobile = info_tile[0].Mobile.value;
            if(this.state.userType === 'learner')
            {
            axios.post(`http://localhost:3001/academy/signin-learner/`,info_tile[0])
            .then(res => {
                if(res.data)
                {
                    axios.post(`http://localhost:3001/academy/signin-learner-det/`,info_tile[0])
                   this.props.onRouteChange(info_tile[0].Username,'Learner-logged')
                }
              })
            }
            else if(this.state.userType === 'instructor')
            {
              axios.post(`http://localhost:3001/academy/signin-teacher/`,info_tile[0])
              .then(res => {
                if(res.data)
                {
                    axios.post(`http://localhost:3001/academy/signin-teacher-det/`,info_tile[0])
                   this.props.onRouteChange(info_tile[0].Username,'Instructor-logged')
                }
              })
            }
        }
      }

        const changeUserId = (newid) => {           
     this.setState({userType : newid});
        }


//To get the inputs
        const CompileGetUserInfo = () => {
           return (
                <div>
                <div className='user-info-comp'>
                <div className='user-info'>Name :</div>
                <input 
                type='text'
                value= {this.state.info.Name.value || ''}
                placeholder={`Enter your Name`} 
                 onChange = {event => {
                    getStoreValue('Name',event.target.value)}
                    }
                />     
                </div>
                {this.state.info.Name.accepted ? null : <div className='error-msg'>{this.state.info.Name.error}</div>}
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
                <div className='user-info-comp'>
                <div className='user-info'>Mobile :</div>
                <input 
                type='text'
                value= {this.state.info.Mobile.value || ''}
                placeholder={`Enter your Mobile no`}
                onChange = {event => {
                    getStoreValue('Mobile',event.target.value)}
                    }
                />
                </div>
                {this.state.info.Mobile.accepted ? null : <div className='error-msg'>{this.state.info.Mobile.error}</div>}
                 <div className='submit-button'>
                <img alt='Sign up' onClick={()=>checkFormValid()} style={{width:90 ,height:50 }}  src={require('../photos/Signup.png')} />
                <img alt='Login' onClick={() => this.props.onRouteChange('login','Link')}  style={{width:90 ,height:50 }}  src={require('../photos/Login.png')} />
                </div> 
                </div>
            )
        }
        const compileSignupForm = () => {
            return (
                <div>
                <div className='signup-id'>
                 <div className={this.state.userType==='learner' ? 'signup-comp-dark' : 'signup-comp-light'} onClick={() => changeUserId('learner')}>Learner</div> 
                 <div className={this.state.userType==='instructor' ? 'signup-comp-dark' : 'signup-comp-light'} onClick={() => changeUserId('instructor')}>Instructor</div>
                 </div>
                 
                <div className='user-info-tab'>{CompileGetUserInfo() }
               </div></div>
            )
        }
return(
    <div className='signup-panel'>
    {compileSignupForm()}
    </div>
)
}}
export default Signup;