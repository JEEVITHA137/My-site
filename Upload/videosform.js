import React, {Component} from 'react';
import GetVideo from './getvideo';
class VideosForm extends Component{
    constructor(){
        super();
        this.state = {
         videos : [],
         video : 0,
         new : ''
        }
    }
    componentWillMount(){
       let newcount=[];
       for (let i=0;i<this.props.count;i++)
       {
          newcount = [...newcount,{
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
        }];
       }
       this.setState({
           videos :[...newcount]
       })
   }
   //To store the change in the state
   onFormChange = (newform) => {
    this.setState({
        new : newform
    })
}
//To change to next video
   nexttitle = () => {
       let newVideos=[...this.state.videos]
      newVideos[this.state.video] = this.state.new[0]
    const newtitle = this.state.video + 1;
      this.setState({
          video : newtitle,
          videos : [...newVideos]
      })
 }
 //To change to prev video
 prevtitle = () =>  {
    const newtitle = this.state.video - 1;
      this.setState({
          video : newtitle
      })
 }
 //On last video submit
 onSubmit= () => {
    let renderedVideos = [];
    this.state.videos.map((inside)=>
    {
        if(inside.quiz.length === 0)
        {
            let get = {
                video : '',
                URL : '',
                description : ''
                };
             get.video = inside.name.value;
             get.URL = inside.URL.value;
             get.description = inside.description.value;
             renderedVideos = [...renderedVideos,get]
        }
        else{
     let get = {
        video : '',
        URL : '',
        description : '',
        quiz : []
        };
     get.video = inside.name.value;
     get.URL = inside.URL.value;
     get.description = inside.description.value;
     get.quiz = inside.quiz;

     renderedVideos = [...renderedVideos,get]
        }
        return null;
    }
    )
     this.props.getStoreTitle(renderedVideos)
 }
 //To render the videos form
    render(){
        const compileTitlesForm = () => {
      return (
            <div>
            <GetVideo getBack={this.props.getBack} video={this.state.video} videos={this.state.videos} count={this.props.count} prevtitle={this.prevtitle} onSubmit={this.onSubmit} nexttitle={this.nexttitle} onFormChange={this.onFormChange} />
            </div>
        )
    }
        
        return (<div>{compileTitlesForm()}</div>)
    }
}
export default VideosForm;