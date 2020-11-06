import React, { Component, useState, useRef, useEffect } from 'react';
import Ball from './Ball';

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);

    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) =>  p - c);
    return [...winNumbers, bonusNumber];

}

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    useEffect(() => {
        for ( let i = 0; i < winNumbers.length - 1; i++){
            this.timeouts[i] = setTimeout(() => {
                 this.setState((prevState) => {
                    return{
                        winBalls: [...prevState.winBalls, winNumbers[i]], // react에서 state 배열에다가 값을 넣을때는 배열에다가 push하면 안되고 예전 state이용해서 넣어줘야한다
                    };
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    }, []); // input 자리가 빈 배열이면 componentDidMount와 동일

    const onClickRedo = () =>{
        console.log('onClickRedo');
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자를 미리 뽑아놓는다
            winBalls: [],
            bonus: null,
            redo: false,
        });
        timeouts.current = [];
        this.timeouts = [];
    }

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key = {v} number={v} />)} 
                {/* winBalls의 빈리스트에 숫자들이 하나씩 생겨난다. 그러면 자동으로 react가 그려준다 */}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick = { this.onClickRedo}>한 번 더!</button>}
        </>
    );
}


class Lotto extends Component{
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자를 미리 뽑아놓는다
        winBalls: [],
        bonus: null,
        redo: false,
    };

    timeouts = [];
    runTimeouts = () => {
        const { winNumbers } = this.state;
        for ( let i = 0; i < winNumbers.length - 1; i++){
            this.timeouts[i] = setTimeout(() => {
                 this.setState((prevState) => {
                    return{
                        winBalls: [...prevState.winBalls, winNumbers[i]], // react에서 state 배열에다가 값을 넣을때는 배열에다가 push하면 안되고 예전 state이용해서 넣어줘야한다
                    };
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    }

    componentDidMount(){ //컴포넌트가 첫번째 렌더링이 되자마자 실행이 된다.
        console.log('didMount');
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState){
        console.log('didUpdate');
        if(this.state.winBalls.length === 0){ //componentDidUpdate은 조건문이 중요하다
            this.runTimeouts();
        }
    }

    componentWillUnmount(){
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => { // 한번 더 할려면 그대로 가져오면 된다.
        console.log('onClickRedo');
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자를 미리 뽑아놓는다
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    }


    render(){
        const {winBalls, bonus, redo} = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key = {v} number={v} />)} 
                    {/* winBalls의 빈리스트에 숫자들이 하나씩 생겨난다. 그러면 자동으로 react가 그려준다 */}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick = { this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;