import React, { Component } from 'react';
import FirstComponent from './FirstComponent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'

class LearningComponents extends Component {
    render(){
        return (
            <div className="learningComponents">
                Hello World
                <FirstComponent></FirstComponent>
                <SecondComponent></SecondComponent>
                <ThirdComponent></ThirdComponent>
            </div>
        )
    }
}

export default LearningComponents