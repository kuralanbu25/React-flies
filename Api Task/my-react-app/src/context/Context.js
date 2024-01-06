import React, { createContext, useState } from 'react'


export const create=createContext()
export const Context = ({children}) => {
    const [object,setObject]=useState(0)

    const increment=()=>{
        return setObject(object+1)
    }
     const decrement=()=>{
        return setObject(object-1)
    }
  return (
    <div>
        <create.Provider  value={{object,increment,decrement}}>{children}</create.Provider>
    </div>
  )
}
