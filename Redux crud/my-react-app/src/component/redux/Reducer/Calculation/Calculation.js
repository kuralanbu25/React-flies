import * as Type from "../../type/Type"



const initialState = {
  products: [], // Ensure that products is initialized as an empty array
  obj: null,
};
// const initialState={
//     product:[{productName:"",quantity:0,amount:0,totalAmount:0,totalAmounts:0}],
//     obj:null,
// }
const Calculation = (state=initialState,action)=>{
    switch (action.type) {
        case Type.ADD_PRODUCT:
          return {
            ...state,
            products: [...state.products, action.payload.product],
            // products: [...state.product, action.payload],
          };
          case Type.SELECT_PRODUCT:
            return {
              ...state,
        products: state.products.map((product, index) =>
          index === action.payload.index
            ? {
                ...product,
                productName: action.payload.selectedProduct,
                quantity: 0, // Set quantity to 0 when product changes
                amount: 0, // Clear amount
                totalAmount: 0, // Clear totalAmount
              }
            : product
        ),
            };
      
          case Type.UPDATE_QUANTITY:
            return {
              ...state,
              products: state.products.map((product, index) =>
                index === action.payload.index
                  ? { ...product, quantity: action.payload.quantity }
                  : product
              ),
            };
            case Type.CLEAR_AMOUNT_AND_TOTAL:
              return {
                ...state,
                products: state.products.map((product, index) =>
                  index === action.payload.index
                    ? { ...product, quantity: 0, amount: 0, totalAmount: 0 }
                    : product
                ),
              };
              case Type.SAVE_ROW:
                return {
                  ...state,
                  products: state.products.map((product, index) =>
                    index === action.payload.index ? { ...product, flag: true } : product
                  ),
                };
          
              case Type.EDIT_ROW:
                return {
                  ...state,
                  products: state.products.map((product, index) =>
                    index === action.payload.index ? { ...product, flag: false } : product
                  ),
                };
          
              case Type.DELETE_ROW:
                return {
                  ...state,
                  products: state.products.filter((product, index) => index !== action.payload.index),
                };
    
        default:
          return state;
      }
    
}
export default Calculation
