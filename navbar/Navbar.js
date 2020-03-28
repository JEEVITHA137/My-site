import React from 'react';
import './navbar.css'
const Navbar = ({onRouteChange,courses ,searchfield, onSearchChange , logged}) => {
 //Things to be in Nav bar
    let navthings = [
        {
          name :'search',
          type : 'input'
      },
     {
       name : 'courses',
       type : 'menu',
       sub : [...courses]

     }
    ]
    //To set things in Nav bar
    const naviStart = () => {
        let naviThing = []
        if(logged === 'none')
        {
          naviThing =[
     {
         name : 'login',
         type : 'user-info'
     },
     {
        name : 'signup',
        type : 'user-info'
    }
        ]
        }
        else if(logged === 'Admin')
        {
            naviThing =[
                {
                    name : logged,
                    type : 'admin-logged',
                    options : [
                        {
                        name: 'Learners',
                        link:'Learners-panel'
                        },
                       {
                        name: 'Teachers',
                        link: 'Instructors-panel'
                        },
                        {
                            name: 'New Courses',
                            link: 'New Courses'
                            },
                        {
                        name: 'Logout',
                        link: 'Logout'
                      }
                    ]
                }
                   ]
        }
        else 
        {
          naviThing =[
            {
                name : logged,
                type : 'user-logged',
                options : [
                    {
                    name: 'Profile',
                    image :require('../photos/login-icon.png')
                    },
                   {
                    name: 'Dashboard',
                    image :require('../photos/dashboard.png')
                    },
                    {
                    name: 'Logout',
                    image :require('../photos/logout.png')
                  }
                ]
            }
               ]
        }
        
    navthings = [...navthings,...naviThing]
    }

    //To render the nav bar
    const navicompile = () => {
        return navthings.map((thing, i) => {
            
         let template = null;
          if(thing.type === 'input')
         {
            template = <div key={i} className='navi-comp input'>
            <input 
            type='search' 
            value = {searchfield}
             onChange = {event => {
               onSearchChange(event.target.value)}
                }
            placeholder='search courses'
            />
            </div>
         }
         else if(thing.type === 'menu')
         {
            template = <div key={i} className='navi-comp'> 
            <div  className='right-menu'>
            <div className='menu-button' >
            {thing.name}
            </div>
            <div className='dropdown-menu'>
            <div className='menu-options'>
            {thing.sub.map((option, i) => {
                return (
                    <div key={i} className='menu-opt'>  
                     <h5 onClick={() => onRouteChange(option.subject,'Subject')}>{option.subject} </h5> 
                     {option.courses.map((course, i) => {
                        return (
                            <div key={i} className='menu-option' onClick={() => onRouteChange(option.subject,'Course',course.name)} >  
                             {course.name}   
                            <br/>
                            </div>
                        )
                    })} 
                    <br/>
                    </div>
                )
            })}
            </div>
            </div>
            </div>
            </div>
         }
         else if(thing.type === 'user-info')
         {
            template = <div key={i} className='navi-comp' >
            <div onClick={() => onRouteChange(thing.name,'Link')} >{thing.name}</div>
            
            </div>
         }
         else if(thing.type === 'user-logged')
         {
            template = <div key={i} className='navi-comp' >
            <div className='right-menu-login'>
             <div className='menu-button bigg'>{thing.name}</div>
            <div className='dropdown-menu-login'>
            <div className='login-options'>
            {thing.options.map((option, i) => {
                return (
                    <div key={i} className='login-option'>  
                    <img alt='link' style={{width:'20px' ,height:'18px'}} src={option.image} />
                     <h5 onClick={() => onRouteChange(option.name,'Link')}>{option.name} </h5>
                    <br/>
                    </div>
                )
            })}
            </div>
            </div>
            </div>     
            </div>
         }
         else if(thing.type === 'admin-logged')
         {
            template = <div key={i} className='navi-comp' >
            <div className='right-menu-login'>
             <div className='menu-button bigg'>{thing.name}</div>
            <div className='dropdown-menu-login'>
            <div className='login-options'>
            {thing.options.map((option, i) => {
                return (
                    <div key={i} className='login-option'>  
                     <h5 onClick={() => onRouteChange(option.link,'Link')}>{option.name} </h5>
                    <br/>
                    </div>
                )
            })}
            </div>
            </div>
            </div>     
            </div>
         }
            return template;
        })
    }
    return (
        <div className='navibar'>
        <div className='navi-tot'>
        <div className='logo' onClick={() => onRouteChange('Home','Link')}>
        <img className='navi-comp' alt='logo' style={{width:25 ,height:25 ,float:'right'}}  src={require('../photos/logo.png')} />
        <div className='navi-comp logo-name hide'>SD Academy</div>
        </div>
        <div className='nav-right'>
        {naviStart()}
        {navicompile()}
        </div>
        </div>
        </div>
         )
}
export default Navbar;




