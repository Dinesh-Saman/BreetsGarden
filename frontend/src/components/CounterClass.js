import React from "react";

class CounterClass extends React.Component{
    constructor(){
        super();
        this.increment = this.increment.bind(this)
        //state means a JS object
        this.state = {
            number: 0
        }
    }

    //To do the logic of the "Increment" button
    increment(){
        this.setState({
            number: this.state.number+1
        })
    }

    render(){
        //Write the html 
        return(
            <div>
                <h3>Classbase Component</h3>
                <h1>Counter = {this.state.number}</h1> 
                <button onClick={this.increment}>Increment</button>
                <hr></hr>
            </div>
        )
    }
}

export default CounterClass;