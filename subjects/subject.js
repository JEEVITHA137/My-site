import React,{ Component } from 'react';
import './subject.css';
import axios from  'axios';
class Subject extends Component {
constructor(){
    super();
    this.state = {
        subject: ''
    }
}
componentDidMount(){ 
    //To get the details of the subject
 axios.get(`http://localhost:3001/academy/subject?subject=${this.props.sub}`)
 .then(response => { 
     this.setState({
         subject : response.data
     })
 })
}
componentWillReceiveProps(){ 
    //To change the details when subjet changed
    axios.get(`http://localhost:3001/academy/subject?subject=${this.props.sub}`)
    .then(response => { 
        this.setState({
            subject : response.data
        })
    })
}
//To render the courses with description
    render() {
    const compileSubject =() => {     
    return (
        <div className='tot-sub'>{
            this.state.subject.length !== 0 ? <div > {this.state.subject[0].courses.map((course, i) => {
                return (
                    <div key={i}  >  
                    { i%2 === 0 ? 
                        <div className='subject-leftside'>
                        <div className='desc' >{course.description}</div>
                        <div className='subject-course-name' onClick={() => this.props.onRouteChange(this.props.sub,'Course',course.name)} ><h3>{course.name}</h3>  </div>
                     </div> :
                     <div className='subject-rightside'  >
                     <div className='subject-course-name' onClick={() => this.props.onRouteChange(this.props.sub,'Course',course.name)} ><h3>{course.name}</h3>  </div>
                     <div className='desc'>{course.description}</div>
                     </div>  }
                      <br/>
                    </div>
                )
            })} </div> : null
        }
       </div>
    )
    }
    return (
        <div className='subject-promo-theme' >
         {this.state.subject.length !== 0 ?
        <div className='subject-promo-name'>
        <h3 className='subject-name'>{this.state.subject[0].subject}</h3> 
        <img alt='subject' style={{width:'50px' ,height:'50px'}}  src={require(`../photos/${this.state.subject[0].image}`)}/></div> : null}
        
        
        <div className='subject-promo'>  {compileSubject()}</div>
      
      
    </div>
        
        )
    }
}
export default Subject;