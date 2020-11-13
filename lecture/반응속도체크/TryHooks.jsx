import React, {useState} from 'react';


const Try = ({ tryInfo }) => { // 괄호 안은 props 자리  
    
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

export default Try;