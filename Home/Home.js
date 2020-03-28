import React from 'react';
import './Slides.css'
import './subjects.css'
const Home = ({subject, onRouteChange}) => {
    const subjects = [...subject]
    //To render the list of subjects
    const compileSubject = () =>{
        return subjects.map((subject, i) => {
             return (
                 <div key={i} className='subjects'>
                 { i%2 === 0 ? 
                    <div className='subject-pic-left' onClick={() => onRouteChange(subject.subject,'Subject')}>
                    <div className='subject-pic'>
                 <img alt='subject' style={{width:'60px' ,height:'60px'}}  src={require(`../photos/${subject.image}`)} />
                 </div>
                 <h5>{subject.subject}</h5>
                 </div> :
                 <div className='subject-pic-right'  onClick={() => onRouteChange(subject.subject,'Subject')}>
                 <div className='text'><h5>{subject.subject}</h5></div>
                 <div className='subject-pic'>
                 <img alt='subject' style={{width:'60px' ,height:'60px'}}  src={require(`../photos/${subject.image}`)} />
                 </div>
                 </div>  }
                  
                 </div>
             )
         })
    }
    //To render the home photo
   const Slider = () => {
        return (
                  <img className='slide-image' alt='slide' src={require('../photos/BG-image.jpg')} />
        )       
    }
    return (
        <div>
        <div  className='slider'> 
        {Slider()}  
        {compileSubject()}
        </div>
        
        </div>
         )
}
export default Home;