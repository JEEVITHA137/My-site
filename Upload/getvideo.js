import React, {Component} from 'react';
import GetQuizForm from './getquizform';
class getTitle extends Component{
    constructor(){
        super();
        this.state = {
         video : [
             {
                 name : {
                    value : '',
                    accepted : true
                },
                 URL : {
                    value : '',
                    accepted : true
                },
                 description : {
                    value : '',
                    accepted : true
                },
                 quiz : []
             }
         ],
         Quiz : '',
         no_of_quiz : {
            value : '',
            accepted : true
        },
         place : 'start',
         changed : false
        }
    }
    //To change to Prev Video
    changePrevVideo = () => {
        let content = [];
       let newQuiz = {
            value : '',
            accepted : true
        }
          content =[ ...content,this.props.videos[this.props.video -1]];
          this.setState({
              video : content,
              place : 'start',
              no_of_quiz: newQuiz
          })
          this.props.prevtitle()
        }
        //To change to next video
    changeNextVideo = () => {
        let content = [];
        let newQuiz = {
            value : '',
            accepted : true
        }
          content =[ ...content,this.props.videos[this.props.video +1]];
          this.setState({
              video : content,
              place : 'start',
              no_of_quiz: newQuiz
          })
          this.props.nexttitle()
        }
        //To get back to Video form
    getBAck = () => {
        this.setState({
            place : 'start'
        })
    }
    //To take in and store the Quiz feed
    takeInQuiz = (feed) => {
        let newVideo = [...this.state.video];
        newVideo[0].quiz = [...feed]
        this.setState({
            video: [...newVideo]
        })
        if(this.props.video === this.props.count-1)
        {
            this.setState({
                place:'start'
            })
            this.props.onSubmit()
        }
        else
        {
        this.changeNextVideo()
        }
    }
    
    componentWillMount(){
        //To set the value to state
        let content = []
        content =[ ...content,this.props.videos[this.props.video]];
        this.setState({
            video : content
        })
    }
    
    render(){  
        //To check validation and store value
    const getStoreValue = (name,value) => {
        if(name === 'no_of_quiz')
       {
          let clean= this.state.no_of_quiz;
           clean.value = value;
            if(clean.value > 2 && clean.value < 13)
           {
               clean.accepted = true;
           }
           else 
           {
               clean.accepted = false;
           }
        this.setState({
            no_of_quiz : clean,
            changed : true
        })
       }
        else {
        let trail = [...this.state.video]
       if(name === 'Video Name')
       {
           trail[0].name.value = value; 
        if(trail[0].name.value.length > 3 && trail[0].name.value.length < 30)
           {
               trail[0].name.accepted = true;
           }
           else 
           {
               trail[0].name.accepted = false;
           }
       }
       else if(name === 'URL')
       {
           trail[0].URL.value = value;
           if(trail[0].URL.value.length > 3 && trail[0].URL.value.length < 11)
           {
               trail[0].URL.accepted = true;
           }
           else 
           {
               trail[0].URL.accepted = false;
           }
       }
       else if(name === 'Description')
       {
           trail[0].description.value = value;
           if(trail[0].description.value.length > 15 && trail[0].description.value.length < 400)
           {
               trail[0].description.accepted = true;
           }
           else 
           {
               trail[0].description.accepted = false;
           }
       }
        this.setState({
            video : [...trail],
            changed :true
        })
    }
        this.props.onFormChange(this.state.video)
     }
//To change path to Quizform
        const changeQuiz = (get) => {
             if(this.state.Quiz && get === 'no')
             {
                 let quizEmpty = [...this.state.video];
                 quizEmpty[0].quiz = []
                 let quizz= this.state.no_of_quiz;
                 quizz.accepted = true;
                 this.setState({
                     Quiz : false,
                     no_of_quiz: quizz,
                     video : [...quizEmpty]
                 })
             } 
            else if(!this.state.Quiz && get === 'yes')
             {
                 this.setState({
                     Quiz : true
                 })
             }
        }
        //To get the Quiz
        const compileGetQuiz = () => {
            let template = null;
            if(this.state.place === 'quiz')
            {
                template = <GetQuizForm takeQuiz={this.takeInQuiz} getBack={this.getBAck} count={this.state.no_of_quiz.value} />
            }
            return template
        }
        //To remder the video form
        const compileGetVideo = () => {
      return (
          <div>
          
            <div className='upload-info-comp'>
            <div className='upload-info'>Video Name :</div>
            <input 
            type='text'
            value= {this.state.video[0].name.value}
            placeholder={`Enter Video Name`}
           onChange = {event => {
        getStoreValue('Video Name',event.target.value)}
        }
            />
            {this.state.video[0].name.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Description :</div>
            <input 
            type='text'
            value= {this.state.video[0].description.value}
            placeholder={`Enter Description`}
           onChange = {event => {
        getStoreValue('Description',event.target.value)}
        }
            />
            {this.state.video[0].description.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div className='upload-info-comp'>
            <div className='upload-info'>URL :</div>
            <input 
            type='text'
            value= {this.state.video[0].URL.value}
            placeholder={`Enter Url`}
           onChange = {event => {
        getStoreValue('URL',event.target.value)}
        }
            />
            {this.state.video[0].URL.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
    <div className = 'Quiz-avail'><div>Quiz Avail : </div>
     <img className='quiz-button' onClick={()=>changeQuiz('yes')}alt='option' style={{width:60 ,height:30 }}  src={require(`../photos/${this.state.Quiz ? 'yes-on' : 'yes-off'}.png`)} />
     <img className='quiz-button' onClick={()=>changeQuiz('no')} alt='option' style={{width:60 ,height:30 }}  src={require(`../photos/${this.state.Quiz ? 'no-off' : 'no-on'}.png`)} />
     </div>
     {this.state.Quiz ? <div className='upload-info-comp'>
     <div className='upload-info'>No of Quiz :</div>
     <input 
            type='text'
            value = {this.state.no_of_quiz.value}
            placeholder={`Enter no of quiz`}
           onChange = {event => {
            getStoreValue('no_of_quiz',event.target.value)
        }} />
        {this.state.no_of_quiz.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
     </div>: null}
    </div>)
    }
    //On last video Submission
    const getSubmit = () => {
        checkValid();
        if(this.state.changed && this.state.video[0].name.accepted && this.state.video[0].URL.accepted && this.state.video[0].description.accepted && this.state.no_of_quiz.accepted)
     {
         if(this.state.Quiz){
        this.setState({
            place : 'quiz'
        })}
        else{
            this.props.onSubmit()
        }
    }
}
//To check current value validation
    const checkValid = () => {
        
        let trail = [...this.state.video];
        let clean = this.state.no_of_quiz;
        if((clean.value > 2 && clean.value < 13) || !this.state.Quiz)
        {
            clean.accepted = true;
        }
        else 
        {
            clean.accepted = false;
        }
        if(trail[0].name.value.length > 3 && trail[0].name.value.length < 30)
        {
            trail[0].name.accepted = true;
        }
        else 
        {
            trail[0].name.accepted = false;
        }
        if(trail[0].URL.value.length > 3 && trail[0].URL.value.length < 11)
        {
            trail[0].URL.accepted = true;
        }
        else 
        {
            trail[0].URL.accepted = false;
        }
        if(trail[0].description.value.length > 15 && trail[0].description.value.length < 400)
        {
            trail[0].description.accepted = true;
        }
        else 
        {
            trail[0].description.accepted = false;
        }
        this.setState({
            title : [...trail],
            no_of_quiz : clean
        })
    }
    //To store the Quiz and chanage to next video
    const getTheQuiz = () => {
        checkValid();
      if(this.state.changed && this.state.video[0].name.accepted && this.state.video[0].URL.accepted && this.state.video[0].description.accepted && this.state.no_of_quiz.accepted)
     {
        if(this.state.Quiz){
        this.setState({
            place : 'quiz'
        })}
        else if(this.props.count === '1')
        { 
            this.props.onSubmit()  
        }
        else {
            this.changeNextVideo()
        }
    }
    }

        return (
            <div> 
            <div className ='upload-info'>Video : {this.props.video +1}</div>
            {this.state.place === 'start' ? compileGetVideo() :
           compileGetQuiz()
        } 
        { this.state.place === 'start' ?
        <div>
        {   
            this.props.video !== 0 ?
            <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>this.changePrevVideo()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            {this.props.video !== this.props.count-1 ?
             <div className='next-button'><img onClick={()=>getTheQuiz()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
            : 
            <div className='next-button'><img onClick={()=>getSubmit()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Submit.png')} /></div>
        } </div>
            : <div>
            <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>this.props.getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
             <div className='next-button'><img onClick={()=>getTheQuiz()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
         </div>
            </div>
            
          
        }</div> : null }
            </div>
            )
    }
}
export default getTitle;