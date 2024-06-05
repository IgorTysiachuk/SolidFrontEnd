import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    text: "",
    show: false
}


export const setMassage = createAction("SET_MASSAGE_LIST", (object) => {
    return {
        payload: object
    }
})

const MassageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setMassage, (state, action) => {
            state.text = action.payload.text
            state.show = action.payload.show
        })
})
export default MassageReducer