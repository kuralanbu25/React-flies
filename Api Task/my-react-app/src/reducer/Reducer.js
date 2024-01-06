import * as Type from "./Type";

export const initialState = {
  item: [],
  error: null,
};

const Reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case Type.POST_SUCCESS:
      return { ...state, item: [...state.item, action.payload] };
    case Type.POST_ERROR:
    case Type.GET_ERROR:
    case Type.DELETE_ERROR:
    case Type.PUT_ERROR:
    case Type.GET_API_ERROR:
      return { ...state, error: action.payload };
    case Type.GET_SUCCESS:
      return { ...state, item: action.payload };
    case Type.DELETE_SUCCESS:
      return {
        ...state,
        item: state.item.filter((items) => items.id !== action.payload),
      };
    case Type.PUT_SUCCESS:
      return {
        ...state,
        item: state.item.map((items) =>
          items.id === action.payload.id ? action.payload : items
        ),
      };
    case Type.GET_API_SUCCESS:
      return { ...state, item: action.payload };
    default:
      return state;
  }
};

export default Reducer;

