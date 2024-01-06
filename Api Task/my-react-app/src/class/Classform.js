import React, { Component } from 'react'
import Classlist from './Classlist';

export default class Classform extends Component {
    constructor(){
        super()
        this.state = {name: "kural"};

    }
    changeName = () => {
        this.setState({name: "Kuralarasi"});
      }
  render() {
    return (
      <div className="text-center">
                <Classlist props={this.state.name} />

        <button type="submit"
            onClick={this.changeName}
          className="btn btn-info" > Submit
        </button> 
      </div>
    );
  }
}
