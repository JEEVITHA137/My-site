import React from 'react';
//To play the video with the URL given
const VideoPlayer = ({Url}) => {
    return (
        <div className='video-playing'><iframe 
        title='jn'
          width="660"  
           height="415"
           src={`https://www.youtube.com/embed/${Url}`}
           frameBorder="0"
           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen>
           </iframe></div>
    )

}
export default VideoPlayer;