import React from 'react'
import { increment } from './redux/action/Action'
import { decrement } from './redux/action/Action'
import { useDispatch, useSelector } from "react-redux";


export const Components = () => {
    const dispatch = useDispatch();
const user = useSelector((state) => state.Calaculation);
console.log(user)

const inc =()=>{
    dispatch(increment())
 }
  const dec =()=>{
    dispatch(decrement())
 }
  return (
    <div>
        <div className='m-5'>
        <button type='button'className='btn btn-info me-5'onClick={dec} >decrement</button>
        <span>{user.count}</span>
        <button type='button' className='btn btn-success ms-5' onClick={inc} >increment</button>

      </div>
    </div>
  )
}
