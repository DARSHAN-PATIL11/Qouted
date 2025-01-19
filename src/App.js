import React, { Component } from 'react';
import axios from 'axios';
import './App.css'
class App extends Component {
    state = {advice:'',
        color:'black',
        color1:'black',
        colorR:0,
        colorG:0,
        colorB:0,
    };
    componentDidMount(){
        this.fetchAdvice(); 
    }
    fetchAdvice =()=>{
        axios.get('https://api.adviceslip.com/advice')
            .then((response)=>{
                const {advice}=response.data.slip;
                console.log(advice);
                this.setState({advice:advice});
            })
            .catch((error)=>{
                console.log(error);
            });
            this.setState({
                colorR:(this.state.colorR+10)%250,
                colorG:(this.state.colorG+20)%250,
                colorB:(this.state.colorB+30)%250,
                color1: `rgb(${Math.floor(Math.random()*this.state.colorR)}, ${Math.floor(Math.random()*this.state.colorG)}, ${Math.floor(Math.random()*this.state.colorB)})`,
                color: `rgb(${Math.floor(Math.random()*this.state.colorR)}, ${Math.floor(Math.random()*this.state.colorG)}, ${Math.floor(Math.random()*this.state.colorB)})`
            });
              
        
    }
    clickFirst=()=>{
        this.fetchAdvice();
    }
    render() {
        const {advice}=this.state;
        return (
            <div className="app">
                <div className='card'>
                    <h1 className='heading'>{advice}</h1>
                    <button className='button1' style={{backgroundColor : this.state.color1}} onClick={this.clickFirst} >
                        <span>
                            CLICK ME FIRST!
                        </span>
                    </button>
                    <button className='button' style={{backgroundColor : this.state.color}}>
                        <span>
                            GIVE ME ADVICE!
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
