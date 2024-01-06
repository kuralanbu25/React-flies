 import * as Type from "../type/Type"

 export const addproduct=(product)=>({
    type:Type.ADD_PRODUCT,
    payload:{product},

 })
//   export const editproduct=(product)=>({
//     type:Type.EDIT_PRODUCT,
//     payload:product,

//  })
//   export const deleteproduct=(product)=>({
//     type:Type.DELETE_PRODUCT,
//     payload:product,

//  })
//   export const viewproduct=(product)=>({
//     type:Type.VIEW_PRODUCT,
//     payload:product,

//  })

export const selectProduct = (index, selectedProduct) => ({
   type: Type.SELECT_PRODUCT,
   payload: { index, selectedProduct },
 });
 
 export const updateQuantity = (index, quantity) => ({
   type: Type.UPDATE_QUANTITY,
   payload: { index, quantity },
 });

 

 export const clearAmountAndTotal = (index) => ({
   type: Type.CLEAR_AMOUNT_AND_TOTAL,
   payload: { index },
 });
 
 // In your Redux actions file (Action.js)
export const saveRow = (index) => ({
   type: Type.SAVE_ROW,
   payload: { index },
 });
 
 export const editRow = (index) => ({
   type: Type.EDIT_ROW,
   payload: { index },
 });
 
 export const deleteRow = (index) => ({
   type: Type.DELETE_ROW,
   payload: { index },
 });
 
 