import React, { Component } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 어떤 손 내고있는지 판단
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위, 
        score: 0,
    };

    interval; // RSD가 붙었다 땠다 하면

    

    componentDidMount() { //render가 성공실행되면 실행된다. 하지만, state가 바뀌어서 re-rendering이 일어나면 실행되지 않는다. 컴포넌트가 첫 렌더링 된 후 -> 비동기 요청
        this.interval = setInterval(this.changeHand, 100);
    }

    componentDidUpdate(){ //re-rendering후에는 componentDidUpdate가 실행된다

    }

    componentWillUnMount(){ //컴포넌트가 제거되기 직전 // componentDidMount가 했던것을 제거한다. 부모에 의해서 내가 없어질때  -> 비동기 요청 정리
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state;      
        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if(imgCoord == rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보 
            })
        } else if(imgCoord == rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위, 
            });
        } 
    
    };

    onClickBtn =(choice) => () =>{ // 메서드 안에 함수를 호출하는 부분이 있으면, 화살표 함수를 지우고, 화살표를 다시 함수에다 넣어주면 된다. 
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore -cpuScore;
        if ( diff === 0){
            this.setState({
                result: '비겼습니다!',
            });
        } else if([-1, 2].includes(diff)){
            this.setState((prevState) =>{ //이기면 옛날점수에서 점수가 더해지기 때문에 
                return{
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) =>{ //이기면 옛날점수에서 점수가 더해지기 때문에 
                return{
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
            
        }
        setTimeout(() =>{
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
        
    };

    render(){

        const {result, score, imgCoord } = this.state;

        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;