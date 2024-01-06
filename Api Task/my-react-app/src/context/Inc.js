import React, { useContext } from 'react'
import { create } from './Context'

export const Inc = () => {
    const{increment,decrement,object}=useContext(create)
 
  return (
    <div>
        <div className='m-5'>
        <button type='button'className='btn btn-info me-5' onClick={decrement}>decrement</button>
      <span>{object}</span>
      <button type='button' className='btn btn-success ms-5' onClick={increment}>increment</button>

      </div>
    </div>
  )
}
