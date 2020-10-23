import React, { Component } from 'react';

class ResponseCheck extends Component{
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    };

    timeout;
    starttime;
    endtime;

    onClickScreen = () => {
        const {state, message, result} = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.starttime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
            
        } else if (state === 'ready'){
            clearTimeout(this.timeout);
            this.setState({
                
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요'
            })
        } else if (state === 'now'){
            this.endtime = new Date();
            this.setState((prevState) => {
                return{
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...prevState.this.endtime - this.starttime],
                }; 
            });
        }
    };

    renderAverage = () => {
        const { result } = this.state;
        return this.state.result.length === 0 
            ? null 
            : <div>평균 시간: {result.reduce((a, c) => a + c / result.length)}ms</div> 
        
    }

    render(){
        return(
            <>
                <div 
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;