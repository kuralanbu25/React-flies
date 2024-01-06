import React from 'react'
import { increment } from './redux/action/Action'
import { decrement } from './redux/action/Action'
import { connect } from 'react-redux'

 const Componentone = (props) => {
  return (
    <div>
    <p>Counter</p>
      <button type='button'className='btn btn-info me-5' onClick={props.increment}>Increment</button>
      <span>{props.count}</span>
      <button type='button'className='btn btn-danger me-5' onClick={props.decrement}>Decrement</button>

    </div>
  )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      count: state.Calaculation.count,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement()),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Componentone);