import React from 'react';
//To render course name
const CourseName = ({onRouteChange, sub, cour}) => {
return (<div className='course-name-click'>
    <h3 onClick= {() =>onRouteChange(sub,'Course',cour)} >{cour}</h3> 
    </div>)
}
export default CourseName;