import React, { Component } from 'react';

export default class quizform extends Component {
    constructor(){
        super();
        this.state = {
            quiz : [
                {
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
                answer : {
                    value : '',
                    accepted : true,
                    changed : false
                } 
                }
            ],
            changed : false
        }
    }
    componentWillMount(){
        //To set the input to state
        let question = []
        question =[ ...question,this.props.quizzed[this.props.Quiz]];
        this.setState({
            quiz : question
        })
    }
    

  render() {
      //To change to Prev Quiz
    const changePrevQuiz = () => {
        let question = []
          question =[ ...question,this.props.quizzed[this.props.Quiz -1]];
          this.setState({
              quiz : question
          })
          this.props.prev()
        }
        //To change to Next Quiz
      const changeNextQuiz = () => {
        checkValid();
      if(this.state.changed && this.state.quiz[0].question.accepted && this.state.quiz[0].q1.accepted && this.state.quiz[0].q2.accepted && this.state.quiz[0].q3.accepted && this.state.quiz[0].q4.accepted && this.state.quiz[0].answer.changed)
          {
      let question = []
        question =[ ...question,this.props.quizzed[this.props.Quiz +1]];
        this.setState({
            quiz : question
        })
        this.props.next()
    }
      }

//To check Validation
      const checkValid = () => {
        
        let trail = [...this.state.quiz];

        if(trail[0].question.value.length > 3 && trail[0].question.value.length < 40)
        {
            trail[0].question.accepted = true;
        }
        else 
        {
            trail[0].question.accepted = false;
        }

        if(trail[0].q1.value.length > 0 && trail[0].q1.value.length < 30)
        {
            trail[0].q1.accepted = true;
        }
        else 
        {
            trail[0].q1.accepted = false;
        }
        if(trail[0].q2.value.length > 0 && trail[0].q2.value.length < 30)
        {
            trail[0].q2.accepted = true;
        }
        else 
        {
            trail[0].q2.accepted = false;
        }
         if(trail[0].q3.value.length > 0 && trail[0].q3.value.length < 30)
        {
            trail[0].q3.accepted = true;
        }
        else 
        {
            trail[0].q3.accepted = false;
        } 
        if(trail[0].q4.value.length > 0 && trail[0].q4.value.length < 30)
        {
            trail[0].q4.accepted = true;
        }
        else 
        {
            trail[0].q4.accepted = false;
        }
        if(trail[0].answer.changed)
        {
            trail[0].answer.accepted = true;
        }
        else 
        {
            trail[0].answer.accepted = false;
        }
        this.setState({
            quiz : [...trail]
        })
    }
    //To store value with validation
    const getStoreValue = (name,value) => {
        let trail = [...this.state.quiz]
       if(name === 'Question')
       {
           trail[0].question.value = value;
           if(trail[0].question.value.length > 3 && trail[0].question.value.length < 40)
           {
               trail[0].question.accepted = true;
           }
           else 
           {
               trail[0].question.accepted = false;
           }
       }
       else if(name === 'Option 1')
       {
           trail[0].q1.value = value;
           if(trail[0].q1.value.length > 0 && trail[0].q1.value.length < 30)
           {
               trail[0].q1.accepted = true;
           }
           else 
           {
               trail[0].q1.accepted = false;
           }
       }
       else if(name === 'Option 2')
       {
           trail[0].q2.value = value;
           if(trail[0].q2.value.length > 0 && trail[0].q2.value.length < 30)
           {
               trail[0].q2.accepted = true;
           }
           else 
           {
               trail[0].q2.accepted = false;
           }
       }
       else if(name === 'Option 3')
       {
           trail[0].q3.value = value;
           if(trail[0].q3.value.length > 0 && trail[0].q3.value.length < 30)
           {
               trail[0].q3.accepted = true;
           }
           else 
           {
               trail[0].q3.accepted = false;
           }
       }
       else if(name === 'Option 4')
       {
           trail[0].q4.value = value;
           if(trail[0].q4.value.length > 0 && trail[0].q4.value.length < 30)
           {
               trail[0].q4.accepted = true;
           }
           else 
           {
               trail[0].q4.accepted = false;
           }
       }
        this.setState({
            quiz : [...trail],
            changed : true
        })
        this.props.onFormChange(this.state.quiz)
     }
//To change answer of quiz
      const changeAnswer =(value) => {
        let trail = [...this.state.quiz]
        trail[0].answer.value = value;
        trail[0].answer.accepted = true;
        trail[0].answer.changed = true;
        this.setState({
            quiz : [...trail]
        })
      }
      //to sent the quiz data
      const submitQuiz = () => {
        checkValid();
        if(this.state.changed && this.state.quiz[0].question.accepted && this.state.quiz[0].q1.accepted && this.state.quiz[0].q2.accepted && this.state.quiz[0].q3.accepted && this.state.quiz[0].q4.accepted && this.state.quiz[0].answer.changed)
            {
                this.props.submit()
            }
      }
      //To render quiz form
    const CompileGetQuizInfo = () => {
       return (<div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Question :</div>
            <input 
            type='text'
            value = {this.state.quiz[0].question.value}
            placeholder={`Enter Question`}
           onChange = {event => {
        getStoreValue('Question',event.target.value)}
        }
            />
            {this.state.quiz[0].question.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Option 1 :</div>
            <input 
            type='text'
            value = {this.state.quiz[0].q1.value}
            placeholder={`Enter Option 1`}
           onChange = {event => {
        getStoreValue('Option 1',event.target.value)}
        }
            />
            {this.state.quiz[0].q1.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
             <div className='upload-info-comp'>
            <div className='upload-info'>Option 2 :</div>
            <input 
            type='text'
            value = {this.state.quiz[0].q2.value}
            placeholder={`Enter Option 2`}
           onChange = {event => {
        getStoreValue('Option 2',event.target.value)}
        }
            />
            {this.state.quiz[0].q2.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
             <div className='upload-info-comp'>
            <div className='upload-info'>Option 3 :</div>
            <input 
            type='text'
            value = {this.state.quiz[0].q3.value}
            placeholder={`Enter Option 3`}
           onChange = {event => {
        getStoreValue('Option 3',event.target.value)}
        }
            />
            {this.state.quiz[0].q3.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Option 4 :</div>
            <input 
            type='text'
            value = {this.state.quiz[0].q4.value}
            placeholder={`Enter Option 4`}
           onChange = {event => {
        getStoreValue('Option 4',event.target.value)}
        }
            />
            {this.state.quiz[0].q4.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            
            </div>)
    }
//To get answer
    const compileQuizForm = () => {
        return (
            <div>
            <div className='upload-info-tab'>{CompileGetQuizInfo() }
            <div className = 'Quiz-avail'><div>Answer : </div>
            <img className='quiz-button' onClick={()=>changeAnswer(1)}alt='option' style={{width:40 ,height:30 }}  src={require(`../photos/${this.state.quiz[0].answer.value === 1 ? 'one-on' : 'one-off'}.png`)} />
            <img className='quiz-button' onClick={()=>changeAnswer(2)} alt='option' style={{width:40 ,height:30 }}  src={require(`../photos/${this.state.quiz[0].answer.value === 2 ? 'two-on' : 'two-off'}.png`)} />
            <img className='quiz-button' onClick={()=>changeAnswer(3)}alt='option' style={{width:40 ,height:30 }}  src={require(`../photos/${this.state.quiz[0].answer.value === 3 ? 'three-on' : 'three-off'}.png`)} />
            <img className='quiz-button' onClick={()=>changeAnswer(4)} alt='option' style={{width:40 ,height:30 }}  src={require(`../photos/${this.state.quiz[0].answer.value === 4 ? 'four-on' : 'four-off'}.png`)} />
            {this.state.quiz[0].answer.accepted  ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
             </div>
             </div>
        )
    }
    return (
      <div>
      <div className ='upload-info'>Question : {this.props.Quiz +1}</div>
        {compileQuizForm()}
        {  
            this.props.Quiz !== 0 ?
            <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>changePrevQuiz()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            {this.props.Quiz !== this.props.count-1 ?
             <div className='next-button'><img onClick={()=>changeNextQuiz()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
            : 
            <div className='next-button'><img onClick={()=>submitQuiz()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
        } </div>
            : <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={() => this.props.getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
             <div className='next-button'><img onClick={()=>{this.props.count === '1' ? this.props.submit() :changeNextQuiz()}} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
             </div>
               
        }
      </div>
    )
  }
}
