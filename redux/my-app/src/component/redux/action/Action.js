// import { INCREMENT } from "../type/Type";
// import { DECREMENT } from "../type/Type";
import * as Type from '../type/Type'

export const increment=()=>{
    return {
        type:Type.INCREMENT,
    }
}
export const decrement=()=>{
    return {
        type:Type.DECREMENT,
    }
    
}
