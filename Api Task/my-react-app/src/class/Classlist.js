import React, { Component } from 'react'

export default class Classlist extends Component {
    constructor(props){
        super()
        this.state = {
           name:props
        };
    }
  render() {
    return (
      <div >
        {this.props.props}
      </div>
    )
  }
}
