import React , {Component} from 'react';
import './piechart.css';
import axios from  'axios';
import Piechart from './piechart';

class Answered extends Component {
  constructor() {
    super();
    this.state = {
        First : '',
        Finish : false
    }
}

componentWillMount(){ 
  //To get details of logged learner
 if(this.props.logged === 'Learner'  && this.state.loggedIn !== 'Admin')
 {
  axios.get(`http://localhost:3001/academy-log/learner-detail/?username=${this.props.loggedIn}`)
  .then(response => { 
      let newRay = response.data;
  
    this.setState({
        First : [...newRay]
    })
  })
 }
  }
    render(){
      //To save quiz when answered
      const savequiz = () => {
     
        let NewData = this.state.First[0].Courses;
         if(NewData.length === 0)
         {
             let Data = {
                name : this.props.cour,
                videos : [],
                quiz : [],
                completed : 0
             }
              let quiz = []
              let thisQuiz = {
                video : this.props.vid,
                answered : number,
                no_of_Ques: this.props.questions.length
              }
             quiz = [...quiz,thisQuiz]
             Data.quiz = quiz
             NewData = [...NewData,Data]
         }
         else {
             let MyCourse = NewData.filter(course =>{
                 return course.name === this.props.cour
             })
             if(MyCourse.length === 0)
             {
                let Data = {
                    name : this.props.cour,
                    videos : [],
                    quiz : [],
                    completed : 0
                 }
                 let quiz = []
                 let thisQuiz = {
                   video : this.props.vid,
                   answered : number,
                   no_of_Ques: this.props.questions.length
                 }
                quiz = [...quiz,thisQuiz]
                Data.quiz = quiz
                 NewData = [...NewData,Data]
             }
             else{
                 NewData.map((course)=>{
                     if(course.name === this.props.cour)
                     {
                         let myquiz = course.quiz.filter((qu)=>{
                             return qu.video === this.props.vid
                         })
                         if(myquiz.length === 0)
                         {
                          let quiz = []
                          let thisQuiz = {
                            video : this.props.vid,
                            answered : number,
                            no_of_Ques: this.props.questions.length
                          }
                         quiz = [...quiz,thisQuiz]
                         course.quiz = [...course.quiz,...quiz]   
                         }
                         else{
                           course.quiz.map((qu)=>{
                             if(qu.video === this.props.vid && qu.answered < number)
                             {
                               qu.answered = number
                             }
                             return  null
                           })
                         }
                     }
                     return  null;
                 })
             }
         }
         let NewFirst = this.state.First;
         NewFirst[0].Courses = NewData;
         //To remove old data 
         axios.post(`http://localhost:3001/academy-log/learner-profile/remove/?username=${this.props.loggedIn}`,NewFirst[0])
         .then(res => {
             if(res.data)
             {//To store new data
                 axios.post(`http://localhost:3001/academy-log/learner-profile/change/`,NewFirst[0])
             }
           })
    }
//To update correct answers
        let number =0;
const correctAnswer = () => {
    number = number + 1;
          }

//To render show correct answer when wrong
const compileCrtAnswer =(crt,number) => {
    let template = null 
    if(crt === 1)
    {
        template = <div className = 'answer-below'>
          <div className='answer-comp white'>Correct Answer :</div>
          <div className='answer-comp green'>{this.props.questions[number].q1}</div>
        </div>
    }
    else if(crt === 2)
    {
        template = <div className = 'answer-below'>
          <div className='answer-comp white'>Correct Answer :</div>
          <div className='answer-comp green'>{this.props.questions[number].q2}</div>
        </div>
    }
     else if(crt === 3)
    {
        template = <div className = 'answer-below'>
          <div className='answer-comp white'>Correct Answer :</div>
          <div className='answer-comp green'>{this.props.questions[number].q3}</div>
        </div>
    }
     else if(crt === 4)
    {
        template = <div className = 'answer-below'>
          <div className='answer-comp white'>Correct Answer :</div>
          <div className='answer-comp green'>{this.props.questions[number].q4}</div>
        </div>
    }
    return template;
}
//To render the answer
const compileYourAnswer = (number,answer) => {
    let template = null;
    if(answer === 1) 
    {
      template =<div>{this.props.questions[number].answer === 1 ? <div className='green answer-comp'>{this.props.questions[number].q1}{correctAnswer()}</div> :
      <div><div className='red answer-comp wrong'><div className='wrong-answer'>{this.props.questions[number].q1}</div><div>{compileCrtAnswer(this.props.questions[number].answer,number)}</div></div> 
        </div>}</div>
    }
    else if(answer === 2) 
    {
      template =<div>{this.props.questions[number].answer === 2 ? <div className='green answer-comp'>{this.props.questions[number].q2}{correctAnswer()}</div> :
      <div><div className='red answer-comp wrong'><div className='wrong-answer'>{this.props.questions[number].q2}</div><div>{compileCrtAnswer(this.props.questions[number].answer,number)}</div></div> 
        </div>}</div>
    }
    else if(answer === 3) 
    {
      template =<div>{this.props.questions[number].answer === 3 ? <div className='green answer-comp'>{this.props.questions[number].q3}{correctAnswer()}</div> :
      <div><div className='red answer-comp wrong'><div className='wrong-answer'>{this.props.questions[number].q3}</div><div>{compileCrtAnswer(this.props.questions[number].answer,number)}</div></div> 
        </div>}</div>
    }
    else if(answer === 4) 
    {
      template =<div>{this.props.questions[number].answer === 4 ? <div className='green answer-comp'>{this.props.questions[number].q4}{correctAnswer()}</div> :
      <div><div className='red answer-comp wrong'><div className='wrong-answer'>{this.props.questions[number].q4}</div><div>{compileCrtAnswer(this.props.questions[number].answer,number)}</div></div> 
        </div>}</div>
    }
    
    return template;
}
//To render the answers tab
const compileAnswers = () => {
        return this.props.questions.map((question, i) => {
             return (
                 <div key={i}>
                  <div className='Quiz-ques'>
             <div className='ques-no '>{i + 1 }.</div>
            {question.question}</div>
            <div className='answer-below'>
             <div className='answer answer-comp'> your Answer : </div> 
             <div>{compileYourAnswer(i,this.props.answer[i])}</div>
                 </div></div>
             )
         })
    }
return(
    <div>
    {compileAnswers()}
    <div className='answer-below marks-scored'><div>Your Marks : </div><div className='marks'>{number}</div>
    <div className='pie-chart'>
    <Piechart answer={number} total={this.props.questions.length}/></div></div>
    <div className='answer-retry'>
    <div onClick={() => this.props.onExit()}><img alt='option' style={{width:60 ,height:35 }}  src={require('../photos/Retry.png')} /></div>
    </div>
 
    {this.state.First.length !== 0 ? savequiz() : null}
    </div>
     )
    }
}
export default Answered;
 