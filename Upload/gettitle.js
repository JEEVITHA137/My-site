import React, {Component} from 'react';
import VideosForm from './videosform';
class getTitle extends Component{
    constructor(){
        super();
        this.state = {
         title : [
             {
                 name : {
                    value : '',
                    accepted : true
                },
                 no_of_videos : {
                    value : '',
                    accepted : true
                },
                 videos : []
             }
         ],
         place : 'start'
        }
    }
    //To check the input valid
    checkValid = () =>{
     let trail = [...this.state.title]
        if(trail[0].name.value.length > 0 && trail[0].name.value.length < 30)
        {
            trail[0].name.accepted = true;
        }
        else 
        {
            trail[0].name.accepted = false;
        } 
        if(trail[0].no_of_videos.value > 0 && trail[0].no_of_videos.value < 13)
        {
            trail[0].no_of_videos.accepted = true;
        }
        else 
        {
            trail[0].no_of_videos.accepted = false;
        }
        this.setState({
            title : [...trail]
        })
    }
    //To get back to Video form
    getBAck = () => {
        this.setState({
            place : 'start'
        })
    }
    //To change to next title
    changeNextTitle = () => {
      
        let content = []
          content =[ ...content,this.props.titles[this.props.title +1]];
          this.setState({
              title : content,
              place : 'start'
          })
          this.props.nexttitle()
        }
        //To change to prev title
    changePrevTitle = () => {
        let content = []
          content =[ ...content,this.props.titles[this.props.title -1]];
          this.setState({
              title : content,
              place : 'start'
          })
          this.props.prevtitle()
        }
        //To store the recieved title
    getStoreTitle = (feed) => {
        let newTitle = [...this.state.title];
        newTitle[0].videos = [...feed]
        this.setState({
            title: [...newTitle]
        })
        if(this.props.title === this.props.count-1)
        {
            this.setState({
                place:'start'
            })
            this.props.onSubmit()
        }
        else
        {
        this.changeNextTitle()
        }
    }
    
    componentWillMount(){
        //To store the value in state
        let content = []
        content =[ ...content,this.props.titles[this.props.title]];
        this.setState({
            title : content
        })
    }
    render(){
        //To store the value with validation
        const getStoreValue = (name,value) => {
            let trail = [...this.state.title]
            if(name === 'Title Name')
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
           else if(name === 'No of Videos')
           {
            trail[0].no_of_videos.value = value;
            if(trail[0].no_of_videos.value > 0 && trail[0].no_of_videos.value < 13)
            {
                trail[0].no_of_videos.accepted = true;
            }
            else 
            {
                trail[0].no_of_videos.accepted = false;
            }
         }
            this.setState({
                video : [...trail]   
            })
            this.props.onFormChange(this.state.title)
         }
        //To get the Videos Form
    const compileGetVideos = () => {  
        let template = null;
        if(this.state.place === 'videos')
        {
            template = <VideosForm getBack={this.getBAck} prevtitle={this.changePrevTitle} getStoreTitle={this.getStoreTitle} count={this.state.title[0].no_of_videos.value} />
        }
        return template
    }
        //To render title form
        const compileGetTitle = () => {
      return (
          <div>
            <div className='upload-info-comp'>
            <div className='upload-info'>Title Name :</div>
            <input 
            type='text'
            value={this.state.title[0].name.value}
            placeholder={`Enter Title Name`}
           onChange = {event => {
        getStoreValue('Title Name',event.target.value)}
        }
            />
            {this.state.title[0].name.accepted ? null : <div className='error-msg'>!...this field must be filled correctly</div>}
            </div>
            <div  className ='upload-info-comp'>
            <div className ='upload-info'>No of Videos :</div>
            <input 
            type='text'
            value={this.state.title[0].no_of_videos.value}
            placeholder={`Enter No of Videos`}
           onChange = {event => {
        getStoreValue('No of Videos',event.target.value)}
        }
            />
            {this.state.title[0].no_of_videos.accepted ? null : <div className='error-msg'>!...this field must be between 1 and 12</div>}
            </div>
            </div>
       )
    }
    //to change path to videos form
    const getTheVideos = () => {
         if(this.state.title[0].name.accepted && this.state.title[0].no_of_videos.accepted ){
        this.setState({
            place : 'videos'
        })
    }
    }
    //To change path by validation
        const proceed = () => {
            this.checkValid()
            getTheVideos()
        }
        return (
            <div>
            <div className ='upload-info'>Title : {this.props.title +1}</div>
            {this.state.place === 'start' ? compileGetTitle() :
            compileGetVideos()
        }
        { this.state.place === 'start' ?
        <div>
        {  
            this.props.title !== 0 ?
            <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>this.changePrevTitle()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            <div className='next-button'><img onClick={()=>proceed()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
          </div>
            : <div className='lower-buttons'>
            <div className='prev-button-front'><img onClick={()=>this.props.getBack()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Prev.png')} /></div>
            <div className='next-button'><img onClick={()=>proceed()} alt='option' style={{width:60 ,height:50 }}  src={require('../photos/Next.png')} /></div>
          </div>
            
          
        }</div> : null }
            </div>
            )
    }
}
export default getTitle;