import React, { Component } from 'react'
import CounterButton from './CounterButton'

class Counter extends Component {
    
    // Define initial state in a constructor
    // state => 0
    constructor(){
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }
    
    render() {
        return (
            <div className="counter">
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} by={5}></CounterButton>
                <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement} by={10}></CounterButton>
                <span className="count">{this.state.counter}</span>
                <div>
                    <button className="reset" onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }

    reset() {
        // not using prevState, don't need to be an arrow function
        this.setState({ counter : 0 })
    }

    increment = (by) => { // update state: counter++
        console.log(`increment from parent - ${by}`)
        // Never change this.state.variable directly. Instead, setState
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            }
        );
    }

    decrement = (by) => { 
        console.log(`decrement from parent - ${by}`)
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by }
            }
        );
    }
}

export default Counter
