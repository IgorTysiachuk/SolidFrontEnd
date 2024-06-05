import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    products_list: null
}


export const setProductsList = createAction("SET_PRODUCTS_LIST", (array) => {
    return {
        payload: array
    }
})

const productsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setProductsList, (state, action) => {
            state.products_list = action.payload
        })
})
export default productsReducer