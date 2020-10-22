import React, { PureComponent, memo } from 'react';

const Test =memo(() => {
    const [counter, setCounter] = 0;
    const [string, setString] ='hello';
    const [number, setNumber] = 1;
    const [boolean, setBoolean] = true;
    
    const onClick = () => {
       setState({});
    }

    return(
        <div>
            <button onClick={onClick}>클릭</button>
        </div>
    )
        
})

export default Test;

