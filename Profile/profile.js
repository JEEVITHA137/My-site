import React ,{Component} from 'react';
import './profile.css';
import axios from  'axios';

class Profile extends Component {
    constructor() {
      super();
      this.state = {
        profile : [
            {
             name : 'Name',
             value : '', 
              changed : false,
             accepted : true,
             error : ''
            },
            {
             name : 'Age',
             value : '',
             changed : false,
             accepted : true,
             error : ''
            },
            {
             name : 'Gender',
             value : '',
             changed : false,
             accepted : true,
             error : ''
            },
            {
             name : 'Bio',
             value : '',
             changed : false,
             accepted : true,
             error : ''
            },
            {
             name : 'Email',
             value : '',
             changed : false,
             accepted : true,
             error : ''
            },
            {
             name : 'Mobile',
             value : '',
             changed : false,
             accepted : true,
             error : ''
            },
            {
                name : 'Password',
                value : '******',
                changed : false,
                accepted : true,
                error : ''
               }
        ],
        First : [],
        changed: false,
        ref : '',
        both : false

    }
    }   
    
    componentWillMount(){
      //To get info about the logged user
        if( this.props.loggedas !== 'Instructor')
        {
        axios.get(`http://localhost:3001/academy-log/learner-detail/?username=${this.props.logged}`)
        .then(response => { 
            let newRay = response.data;
            let firstValue = [...this.state.profile];
            firstValue[0].value = newRay[0].Name;
            firstValue[1].value = newRay[0].Age;
            firstValue[2].value = newRay[0].Gender;
            firstValue[3].value = newRay[0].Bio;
            firstValue[4].value = newRay[0].Email;
            firstValue[5].value = newRay[0].Mobile;
          this.setState({
              profile : [...firstValue],
              First : [...newRay]
          })
        })
    } 
    else
    {
    axios.get(`http://localhost:3001/academy-log/teacher-detail/?username=${this.props.logged}`)
    .then(response => { 
        let newRay = response.data;
        let firstValue = [...this.state.profile];
        firstValue[0].value = newRay[0].Name;
        firstValue[1].value = newRay[0].Age;
        firstValue[2].value = newRay[0].Gender;
        firstValue[3].value = newRay[0].Bio;
        firstValue[4].value = newRay[0].Email;
        firstValue[5].value = newRay[0].Mobile;
      this.setState({
          profile : [...firstValue],
          First : [...newRay]
      })
    })
}
    }
    
    render (){
      //To edit the value in state with validation
    const getEdit = (named,value) => {
     let newProfile = [...this.state.profile]
    newProfile.map((pro) => {
         if(pro.name === named)
         {
             this.setState({
                 ref : pro.value
             })
             if(value){
                 if(named=== 'Name')
                 {
                   if(value.length <= 3)
                   {
                     pro.error = 'Name should have more than 3 characters';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else if(value.length >= 11)
                   {
                     pro.error = 'Name should be within 10 characters';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                    pro.changed =true;
                    this.setState({
                        changed:true
                    })
                   }
                 } 
                 
                else if(named=== 'Age')
                 {
                   if(value <= 5)
                   {
                     pro.error = 'Age should be greater than 5';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else if((value.length < 2 && value > 10 ) || value > 99)
                   {
                     pro.error = 'Please provide a valid age';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 }   

                else if(named=== 'Gender')
                 {
                   if(value !== 'Male' && value !== 'Female' && value !== 'Transgender')
                   {
                     pro.error = 'Gender Should be of Male,Female,Transgender';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 }  
                 else if(named=== 'Bio')
                 {
                   if(value.length < 15 || value.length > 30)
                   {
                     pro.error = 'Bio Should be within 15 - 30 Characters';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 } 
                 else if(named=== 'Email')
                 {
                   if(value.length < 5 || value.length > 30 || !value.includes('@') ||!(value.includes('.com') || value.includes('.in')))
                   {
                     pro.error = 'Provide a Valid Mail';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 } 
                  else if(named=== 'Mobile')
                 {
                if(value.match(/^[0-9]+$/) == null)
                    {
                        pro.error = 'Mobile Should be a number';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                    }
                   else if(value < 999999999 || value > 1000000000000000)
                   {
                     pro.error = 'Provide a Valid Mobile';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 } 
                 else if(named=== 'Password')
                 {
                   if(value.length < 5 || value.length > 15)
                   {
                     pro.error = 'Password Should be within 5 - 15 Characters';
                     pro.accepted = false;
                     pro.value = this.state.ref;
                   }
                   else
                   {
                     pro.error = '';
                     pro.accepted = true;
                     pro.value = value;
                     pro.changed =true;
                     this.setState({
                        changed:true
                    })
                   }
                 } 
             }
             else{
                pro.value = 'edit'
             }
         }
         else if(pro.name !== named && pro.value === 'edit')
         {
             pro.value= ''
         }
         return null;
     })
     this.setState({
         profile : [...newProfile]
     })
    }

    //To change the value opens input
const getTheValue = (given,name) => {
    let template = null;
   if(given === 'edit'){
       template = <input className='profile-get-info'
       type='text'
       placeholder='give the value'
       onKeyPress ={event => {
           if (event.key === 'Enter'){
            getEdit(name,event.target.value)
           }
       }}
       />
    }
     else
    {
        template= <div className='profile-content-value-edit' onClick={() => getEdit(name)}>{given !== '' ? given : 'Edit'}</div>    
    }
    return template;
} 
//to save the changed values in DB
const saveChanges = () => {

    let newRay = {
         Username : this.props.logged,
         Name : '',
         Age : '',
         Gender : '',
         Bio : '',
         Email : '',
         Mobile : '',
         Courses : this.state.First[0].Courses
        }
    this.state.profile.map((info)=>{
        if(info.name === 'Name')
        {
            if(info.changed)
            {
               newRay.Name = info.value
               this.setState({
                   both : true
               })
            }
            else{
                newRay.Name = this.state.First[0].Name
            }
        }
        else if(info.name === 'Age')
        {
            if(info.changed)
            {
               newRay.Age = info.value
            }
            else{
                newRay.Age = this.state.First[0].Age
            }
        }
        else if(info.name === 'Gender')
        {
            if(info.changed)
            {
               newRay.Gender = info.value
            }
            else{
                newRay.Gender = this.state.First[0].Gender
            }
        }
        else if(info.name === 'Bio')
        {
            if(info.changed)
            {
               newRay.Bio = info.value
            }
            else{
                newRay.Bio = this.state.First[0].Bio
            }
        }
        else if(info.name === 'Email')
        {
            if(info.changed)
            {
               newRay.Email = info.value
            }
            else{
                newRay.Email = this.state.First[0].Email
            }
        }
        else if(info.name === 'Mobile')
        {
            if(info.changed)
            {
               newRay.Mobile = info.value;
               this.setState({
                both : true
            })
            }
            else{
                newRay.Mobile = this.state.First[0].Mobile
            }
        } 
         else if(info.name === 'Password')
        {
            if(info.changed)
            {
               newRay.Password = info.value;
               this.setState({
                both : true
            })
            }
            else{
                newRay.Password = this.state.First[0].Password
            }
        }
        return null;
    })
    if( this.props.loggedas !== 'Instructor')
    {
    axios.post(`http://localhost:3001/academy-log/learner-profile/remove/?username=${this.props.logged}`,newRay)
    .then(res => {
        if(res.data)
        {
            axios.post(`http://localhost:3001/academy-log/learner-profile/change/`,newRay)
        }
      })
    }
   else
    {
    axios.post(`http://localhost:3001/academy-log/teacher-profile/remove/?username=${this.props.logged}`,newRay)
    .then(res => {
        if(res.data)
        {
            axios.post(`http://localhost:3001/academy-log/teacher-profile/change/`,newRay)
        }
      })
    }

      if(this.state.both){

        if( this.props.loggedas !== 'Instructor')
        {
    axios.post(`http://localhost:3001/academy/learner-profile/remove/?username=${this.props.logged}`,newRay)
    .then(res => {
        if(res.data)
        {
            axios.post(`http://localhost:3001/academy/signin-learner`,newRay)
        }
      })
     
    }
   else
    {
axios.post(`http://localhost:3001/academy/teacher-profile/remove/?username=${this.props.logged}`,newRay)
.then(res => {
    if(res.data)
    {
        axios.post(`http://localhost:3001/academy/signin-teacher`,newRay)
    }
  })
}
      }
      this.setState({
        changed: false
    })
            }
//To render the current info of user
const compileProfile = () => {
    return (
        <div >
        <div className='profile-username'>{this.props.logged}</div>
        <div className='profile-user'>
        {this.state.profile.map((item,i)=>{
            return(<div key={i} className='profile-info'>
                <div className='profile-content'>{item.name} :</div>
                {getTheValue(item.value,item.name)}
                <div className='error-msg'>{item.accepted ? null : item.error}</div>
                </div>)
        })}</div>
        </div>
    )
}
return(
    <div className='profile-panel'>
    {compileProfile()}
    <div className='image'>
    { this.state.changed ?
    <img alt='Save changes' style={{width:75 ,height:50 }}  src={require('../photos/Save.png')} onClick={()=> saveChanges()} /> : null}
    </div>
    <div className='image'>
     { this.props.loggedas !== 'Instructor'?
    <img alt='Become Instructor' style={{width:115 ,height:70 }}  src={require('../photos/Become-Instructor.png')} onClick={()=> this.props.onLoggedChange('Instructor')} /> : null}
    </div>
    </div>
   
    )
}
}
export default Profile;