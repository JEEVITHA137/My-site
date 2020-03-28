import React from 'react';
import './Footer.css'
const Footer = ({onRouteChange ,courses}) => {
    const footerthings = [
        {
            name: 'description',
            content : 'Our mission is to provide a free, world-class education to anyone, anywhere SD Academy is a 501(c)(3) nonprofit organization. Donate or volunteer today!'
        },
        {
            name : 'courses',
            type : 'menu',
            sub : [...courses]
          }
    ]
    //To get the current year
    const CURRENT_YEAR = (new Date()).getFullYear()
    //To render Footer
    const FootCompile = () => {
        return footerthings.map((thing, i) => {
            
            let template = null;
             if(thing.name === 'courses')
            {
               template = 
               <div key={i}>
               <div >subjects</div>
               {thing.sub.map((sub,i) => {
                   return (
                       <div key={i} className='Footer-sub' onClick={() => onRouteChange(sub.subject,'Subject')}>
                       {sub.subject}
                       </div>
                   )
               })}
               </div>
            }
         
               return template;
           })
    }
    return (
        <div className='Footer-all'>
        <div className='Foot-tot'>
        <div className='Foot-left'>{footerthings[0].content}</div>
        <hr />
        <div className='Foot-right'>
        {FootCompile()}
        </div>
        </div>
        <hr />
        <div className='below'>
        <div className='below-left'>
        <div className='below-comp'>@SD Academy {CURRENT_YEAR} All Rights reserved</div>
        <div className='below-comp'>About</div>
        <div className='below-comp'>Copy Rights</div>
        </div>
        <div className='below-right'> 
         <img className='below-comp' alt='logo' style={{width:25 ,height:25 }}  src={require('../photos/instagram.png')} />
         <img className='below-comp' alt='logo' style={{width:25 ,height:25 }}  src={require('../photos/facebook.png')} />
         <img className='below-comp' alt='logo' style={{width:25 ,height:25 }}  src={require('../photos/twitter.png')} />
        
        </div>
         </div>
        </div>
         )
}
export default Footer;