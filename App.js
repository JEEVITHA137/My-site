import React, { Component } from 'react';
import Navbar from './navbar/Navbar';
import './App.css';
import axios from  'axios';
import NewCourses from './Admin/new-courses';
import LearnersPanel from './Admin/learner';
import TeachersPanel from './Admin/teachers-panel';
import Subject from './subjects/subject';
import Upload from './Upload/upload';
import Course from './subjects/course';
import Title from './subjects/title';
import Home from './Home/Home';
import SearchResults from './Home/searchresult';
import Quiz from './subjects/quiz-question';
import Profile from './Profile/profile';
import Dashboard from './Profile/dashboard';
import Footer from './footer/Footer';
import Signup from './Signup/Signup';
import Login from './Login/Login';
class App extends Component {
    constructor(){
        super();
        this.state ={
            route : [
                {
                    category : 'Link',
                    next : 'Home'
                }
            ],
            loggedIn : 'none',
            logged : 'Learner',
            courses : '',
            search : false,
            searchfield : ''
        }
    }
    
    componentWillMount(){
//To get the details of all the subjects
        axios.get('http://localhost:3001/academy/subjects')
        .then(response => { 
            let newRay = response.data;
            this.setState({
               courses : newRay
            })
        })
    }
    //On change to instructor
    onLoggedChange = (given) => {
        if(given=== 'Instructor')
        {
        this.setState({
            route : [
                {
                    category : 'Link',
                    next : 'login'
                }
            ],
            logged : given,
            loggedIn : 'none'       
        })
    }
    }
    //When search input changes
    onSearchChange = (event) => {
        if(event.trim() === ''){
            this.setState({ search : false })
        }
        else{
            this.setState({ search : true })
        }
          this.setState({ searchfield: event })
    
      }
      //On route changes change state
    onRouteChange = (routed,cat,cour,tit,vid,qu) => {
     this.onSearchChange('')
        if(this.state.loggedIn !== 'none')
        {
        if(vid){
            this.setState({
                route : [
                    {
                       category : cat,
                       subject : routed,
                       course : cour,
                       title : tit,
                       quiz: qu,
                       next : vid
                    }
                ]
               });
        }
       else if(tit){
            this.setState({
                route : [
                    {
                       category : cat,
                       subject : routed,
                       course : cour,
                       next : tit
                    }
                ]
               });
        }
       else if(cour){
            this.setState({
                route : [
                    {
                       category : cat,
                       subject : routed,
                       next : cour   
                    }
                ]
               });

        }
        else {
     this.setState({
         route : [
             {
                category : cat,
                next : routed   
             }
         ]
        });}
    }
  else if(cat === 'Link' && ( routed === 'Home' || routed === 'signup'))
  {
   
        this.setState({
            route : [
                {
                   category : cat,
                   next : routed   
                }
            ]
           });
  }
  else {
    this.setState({
        route : [
            {
               category : 'Link',
               next : 'login'   
            }
        ]
       });}

        if (cat==='Link' && routed ==='Logout'){       
        this.setState({
           route : [
               {
                   category : 'Link',
                   next : 'Home'
               }
           ],
           loggedIn : 'none'
       });
         } 
         
         else if (cat==='Learner-logged'){       
            this.setState({
               route : [
                   {
                       category : 'Link',
                       next : 'Home'
                   }
               ],
               loggedIn : routed,
               logged : 'Learner'
           });
             }  
          else if (cat==='Instructor-logged'){       
                this.setState({
                   route : [
                       {
                           category : 'Link',
                           next : 'Home'
                       }
                   ],
                   loggedIn : routed,
                   logged : 'Instructor'
               });
                 }
    }
    
    render(){
        //To render according to state
       const compileRoute = () => {
            let template = null;    
            if(this.state.route[0].category==='Link' && this.state.route[0].next==='Home')
            {
                template = < Home subject={this.state.courses} onRouteChange={this.onRouteChange}/>
            }
            else if(this.state.route[0].category==='Link' && this.state.route[0].next==='login')
            {
                template = < Login logged={this.state.logged} onRouteChange={this.onRouteChange}/>
            }
           else if(this.state.route[0].category==='Link' && this.state.route[0].next==='signup')
            {
                template = < Signup onRouteChange={this.onRouteChange}/>
            }
            else if(this.state.route[0].category==='Link' && this.state.route[0].next==='upload-course')
            {
                template = <Upload onRouteChange={this.onRouteChange} logged={this.state.loggedIn} loggedas={this.state.logged} />
            }
            else if(this.state.route[0].category==='Link' && this.state.route[0].next==='Profile')
            {
                template = < Profile logged={this.state.loggedIn} loggedas={this.state.logged} onLoggedChange={this.onLoggedChange}/>
            }
            else if(this.state.route[0].category==='Link' && this.state.route[0].next==='Dashboard')
            {
                template = < Dashboard logged={this.state.loggedIn} loggedas={this.state.logged}  onRouteChange={this.onRouteChange}  onLoggedChange={this.onLoggedChange}/>
            } 
             else if(this.state.route[0].category==='Link' && this.state.route[0].next==='Learners-panel')
            {
                template = < LearnersPanel/>
            } 
            else if(this.state.route[0].category==='Link' && this.state.route[0].next==='Instructors-panel')
            {
                template = < TeachersPanel/>
            } 
             else if(this.state.route[0].category==='Link' && this.state.route[0].next==='New Courses')
            {
                template = < NewCourses onRouteChange={this.onRouteChange}/>
            }
            else if(this.state.route[0].category==='Subject')
            {
                template = < Subject sub={this.state.route[0].next} onRouteChange={this.onRouteChange}/>
            }
            else if(this.state.route[0].category==='Course')
            {
                template = < Course sub={this.state.route[0].subject}  onRouteChange={this.onRouteChange} cour={this.state.route[0].next}/>
            }
             else if(this.state.route[0].category==='Title')
            {
                template = < Title logged={this.state.logged} loggedIn={this.state.loggedIn} sub={this.state.route[0].subject} onRouteChange={this.onRouteChange} cour={this.state.route[0].course} title={this.state.route[0].next}/>
            }
            else if(this.state.route[0].category==='Quiz')
           {
               template = < Quiz logged={this.state.logged} loggedIn={this.state.loggedIn}  sub={this.state.route[0].subject} onRouteChange={this.onRouteChange} cour={this.state.route[0].course} tit={this.state.route[0].title} quiz={this.state.route[0].quiz} vid={this.state.route[0].next}/>
           }
            return template
        }
    return (
        <div className='whole'>
           <Navbar onRouteChange={this.onRouteChange} searchfield={this.state.searchfield} onSearchChange={this.onSearchChange} courses={this.state.courses} logged={this.state.loggedIn} />
           {this.state.search ? <SearchResults onSearchChange={this.onSearchChange} searchfield={this.state.searchfield} onRouteChange ={this.onRouteChange}/> :compileRoute()}
          <Footer onRouteChange={this.onRouteChange} courses={this.state.courses} />
        </div>
         )
    }
}
export default App;
