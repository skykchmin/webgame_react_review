const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = usetState('');

    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            setResult('딩동댕');
            setWord(value);
            value('');
            inputRef.current.focus();
        } else {
            setResult('딩동댕');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return(
        <>
        <div>{word}</div>
        <form onSubmit = {onSubmitForm}>
            <label id="label" htmlFor="">글자를입력하세요.</label>
            <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
            <button>입력!</button>
        </form>
        <div>{result}</div> 
        </>
    ); 
}

module.exports = WordRelay;