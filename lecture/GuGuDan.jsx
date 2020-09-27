const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => { //함수 컴포넌트, 안에 setState와 ref 할 필요가 없을 때 만들었다.
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState(''); // useState안에 초기값을 넣어준다. 
    const [result, setResult] = useState(''); // setresult: result전용 setState
            //state를 객체로 묶지 않고 쪼갰다

    const inputRef = useRef(null); // ref

    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(parseInt(value) === first * second){
            setResult('정답:' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };     
        
    return (
        <>
            <div>{first} 곱하기 {second}는?</div> 
                <form onSubmit={onSubmitForm}>
                    <input ref={inputRef} onChange={onChangeInput} value = {value} /> 
                    <button>입력!</button>
                </form>
            <div id = "result">{result}</div>
        </>
        );
    };


module.exports = GuGuDan;