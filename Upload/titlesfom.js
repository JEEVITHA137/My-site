import React, {Component} from 'react';
import GetTitle from './gettitle';
class TitlesForm extends Component{
    constructor(){
        super();
        this.state = {
         titles : [],
         title : 0,
         new : ''
        }
    }
    componentWillMount(){
        //to set state according to number of titles 
       let newcount=[];
       for (let i=0;i<this.props.count;i++)
       {
          newcount = [...newcount,{
            name : {
                value : '',
                accepted : true
            },
            no_of_videos : {
                value : '',
                accepted : true
            },
            videos : []
        }];
       }
       this.setState({
           titles:[...newcount]
       })
   }
   //to change to next title
   nexttitle = () => {
    let newTitles=[...this.state.titles]
   newTitles[this.state.video] = this.state.new[0]
 const newtitle = this.state.title + 1;
   this.setState({
       title : newtitle,
       titles : [...newTitles]
   })
}
//To change to prev Title
prevtitle = () =>  {
   const newtitle = this.state.title - 1;
     this.setState({
         title : newtitle
     })
}
 //To change state with feed
 onFormChange = (newform) => {
    this.setState({
        new : newform
    })
}
//On last title submission
 onSubmit= () => {
    let renderedTitles = [];

    this.state.titles.map((inside)=>
    {
     let get = {
        title : '',
        videos : []
        };
     get.videos = inside.videos;
     get.title = inside.name.value;

     renderedTitles = [...renderedTitles,get]
    return null;
    }
    )
     this.props.uploadTitles(renderedTitles)
 }
    render(){
        //To get titles Form
        const compileTitlesForm = () => {
      return (
            <div>
            <GetTitle title={this.state.title} getBack={this.props.getBack} titles={this.state.titles} count={this.props.count} onFormChange={this.onFormChange}  prevtitle={this.prevtitle} onSubmit={this.onSubmit} nexttitle={this.nexttitle}/>
            </div>
        )
    }
        
        return (<div>{compileTitlesForm()}</div>)
    }
}
export default TitlesForm;