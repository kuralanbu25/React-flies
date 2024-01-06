
import { type } from '@testing-library/user-event/dist/type';
import * as Type from '../../type/Type'
const initialState = {
    count:0
  };
  
  const Calaculation = (state = initialState, action) => {
    switch (action.type) {
        case Type.INCREMENT:
            return{...state,count:state.count+1
            }
            case Type.DECREMENT:
            return{...state,count:state.count-1}
      default:
        return state;
    }
  };
  
  export default Calaculation;
  