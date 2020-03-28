import React, { Component } from 'react';
import SubName from './subject-name';
import CourseName from './course-name';
import TitleName from './title-name';
import Answered from './answer';
import './quiz.css';
class Qiuz extends Component {
    constructor(){
        super();
        this.state ={
            ques_no : 0,
            answers :[],
            correct : 0,
            answer : false,
            Questions : []
        }
        
    }
    //To set state back to first
    onExit = () => {
        let count=[];
        for (let i=0;i<this.props.quiz.length;i++)
        {
           count = [...count,-1];
        }
    this.setState({
            ques_no : 0,
            answers :[...count],
            correct : 0,
            answer : false
        })
    }
    componentDidMount(){
        //To set the answers to -1 with number of questions
       let count=[];
       for (let i=0;i<this.props.quiz.length;i++)
       {
          count = [...count,-1];
       }
       this.setState({
           answers:[...count]
       })
   }
   render(){
       //To change the option selected
   const optionChange = (number,option) => {
       const array  = [...this.state.answers]
       array[number] = option
       this.setState({
           answers : array
       })
   }
    //To change to next question
   const onNext = () => {
       if(this.state.answers[this.state.ques_no] !== -1){
       var number = this.state.ques_no + 1;
        this.setState({
           ques_no : number
       })
       }
   }
   //To change to prev question
   const onPrev = () => {
       var number = this.state.ques_no - 1;
        this.setState({
           ques_no : number
       })
   }
   //To go to answers 
   const onSubmit = () => {
       this.setState({
          answer : true
       })
    }
    //To render quiz with state as number 
   const compileQuiz = () => {
       const numbers = this.props.quiz.length -1;
       return(
           <div>
           <div className='Quiz-ques'>
             <div className='ques-no'>{this.state.ques_no + 1}.</div>
           {this.props.quiz[this.state.ques_no].question}</div><br />
            <div className='quiz-opt' onClick={() =>optionChange(this.state.ques_no,1)}>{this.state.answers[this.state.ques_no] !== 1 ? 
                <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button-open.png')} />
                 : <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button.png')} />}
                
                 <div className='quiz-ques-no'> {this.props.quiz[this.state.ques_no].q1}</div> </div> <br />
            <div className='quiz-opt' onClick={() =>optionChange(this.state.ques_no,2)}>{this.state.answers[this.state.ques_no] !== 2 ? 
                <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button-open.png')} />
                 : <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button.png')} />}
                
                 <div className='quiz-ques-no'> {this.props.quiz[this.state.ques_no].q2}</div>  </div> <br />
            <div className='quiz-opt' onClick={() =>optionChange(this.state.ques_no,3)}>{this.state.answers[this.state.ques_no] !== 3 ? 
                <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button-open.png')} />
                 : <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button.png')} />}
                
                 <div className='quiz-ques-no'>{this.props.quiz[this.state.ques_no].q3} </div> </div> <br />
            <div className='quiz-opt' onClick={() =>optionChange(this.state.ques_no,4)}>{this.state.answers[this.state.ques_no] !== 4 ? 
                <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button-open.png')} />
                 : <img alt='option' style={{width:20 ,height:20 }}  src={require('../photos/button.png')} />}
                
                 <div className='quiz-ques-no'>{this.props.quiz[this.state.ques_no].q4}</div>  </div> <br />
            
            {  
                this.state.ques_no !== 0 ?
                <div className='lower-buttons'>
                <div className='prev-button-front'><img onClick={()=>onPrev()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
                {this.state.ques_no !== numbers ?
                 <div className='next-button'><img onClick={()=>onNext()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
                : 
                <div className='next-button'><img onClick={()=>onSubmit()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
            } </div>
                : <div>
                <div className='next-button-last'><img onClick={()=>onNext()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
                </div>
                
              
            }
           
           </div>
       )
   } 
return (
    <div className='quiz-base'>
    <div className='upper-tags'>
      <SubName onRouteChange={this.props.onRouteChange} sub={this.props.sub}/>
      <div className='next-tags'>
    <CourseName  onRouteChange={this.props.onRouteChange} sub={this.props.sub} cour={this.props.cour}/>
    <div className='last-tag'>
    <TitleName  onRouteChange={this.props.onRouteChange} sub={this.props.sub} cour={this.props.cour} tit={this.props.tit}/></div>
    <div className='final-tag'><h4 className='Quiz-video-name'>{this.props.vid}</h4></div></div></div>
    {this.state.answer ? <div><Answered vid={this.props.vid} cour={this.props.cour} logged={this.props.logged} loggedIn={this.props.loggedIn} answer={this.state.answers} questions={this.props.quiz} onExit={this.onExit} /></div> :
    <div>{compileQuiz()}
    </div>
    } 
    </div>
    )
}
}

export default Qiuz;