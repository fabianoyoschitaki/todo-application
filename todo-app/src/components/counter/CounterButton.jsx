import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CounterButton.css'

class CounterButton extends Component {

    constructor(){
        super();
    }

    render = () => {
        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        )
    }
}

// Default value for props
CounterButton.defaultProps = {
    by : 1
}

// Type check
CounterButton.propTypes = {
    by : PropTypes.number
}

export default CounterButton