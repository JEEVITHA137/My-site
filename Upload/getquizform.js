import React, {Component} from 'react';
import QuizForm from './quizform';
class getQuizForm extends Component{
    constructor(){
        super();
        this.state = {
         quiz : [],
         Quiz : 0,
         new : ''
        }
    }
    //To change the state of the quiz form
   onFormChange = (newform) => {
       this.setState({
           new : newform
       })
   }
   
   componentWillMount(){
       //To set state corresponding to no of questions
    let newcount=[];
    for (let i=0;i<this.props.count;i++)
    {
       newcount = [...newcount,{
        question:{
            value : '',
            accepted : true
        },
        q1:{
            value : '',
            accepted : true
        },
        q2:{
            value : '',
            accepted : true
        },
        q3:{
            value : '',
            accepted : true
        },
        q4:{
            value : '',
            accepted : true
        },
        answer :{
            value : '',
            accepted : true
        } 
        }];
    }
    this.setState({
        quiz:[...newcount]
    })
}
//On last quiz completion
//Save Quiz and send
submitQuiz = () =>   {
let renderedQuiz = [];
this.state.quiz.map((inside)=>
{
 let get = {
    question:'',
    q1:'',
    q2:'',
    q3:'',
    q4:'',
    answer :''
    };
 get.question = inside.question.value;
 get.q1 = inside.q1.value;
 get.q2 = inside.q2.value;
 get.q3 = inside.q3.value;
 get.q4 = inside.q4.value;
 get.answer = inside.answer.value;
 renderedQuiz = [...renderedQuiz,get]
 return null;
}
)
    this.props.takeQuiz(renderedQuiz)
} 
//Change to next Title
nexttitle = () =>   {
    this.setState({
        new : ''
    })
 
    const newtitle = this.state.Quiz + 1;
    this.setState({
        Quiz : newtitle
    })
} 
//Change to prev title
prevtitle = () =>  {
    const newtitle = this.state.Quiz - 1;
      this.setState({
          Quiz : newtitle
      })
 }
    render(){
     //To get Quiz questions according to state number
        const compileTitlesForm = () => {
      return (
            <div>
            <QuizForm getBack={this.props.getBack} submit={this.submitQuiz} quizzed={this.state.quiz} count={this.props.count} next={this.nexttitle} prev={this.prevtitle} Quiz={this.state.Quiz} onFormChange={this.onFormChange}/>
            </div>
        )
    }
        
        return (<div>{compileTitlesForm()}</div>)
    }
}
export default getQuizForm;