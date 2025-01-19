import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

class App extends Component {
    state = {
        advice: '',
        color: 'black',
        colorR: 0,
        colorG: 0,
        colorB: 0,
        prevAdvice: '' // Store the previous advice to compare
    };

    componentDidMount() {
        this.fetchAdvice(); 
    }

    fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip;
                console.log(advice);

                // Only update the color if the advice changes
                if (advice !== this.state.prevAdvice) {
                    this.setState({
                        advice: advice,
                        prevAdvice: advice, // Update prevAdvice to the new advice
                        colorR: (this.state.colorR + 10) % 250,
                        colorG: (this.state.colorG + 20) % 250,
                        colorB: (this.state.colorB + 30) % 250,
                        color: `rgb(${Math.floor(Math.random() * this.state.colorR)}, ${Math.floor(Math.random() * this.state.colorG)}, ${Math.floor(Math.random() * this.state.colorB)})`
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { advice, color } = this.state;
        return (
            <div className="app">
                <div className='card'>
                    <h1 className='heading'>{advice}</h1>
                    <button className='button' style={{ backgroundColor: color }} onClick={this.fetchAdvice}>
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
