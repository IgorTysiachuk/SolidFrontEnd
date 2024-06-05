import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    verifed_token: "Loading"
}


export const setVerifedToken = createAction("SET_VERIFED_TOKEN", (string) => {
    return {
        payload: string
    }
})

const VerifedTokenReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setVerifedToken, (state, action) => {
            state.verifed_token = action.payload
        })
})
export default VerifedTokenReducer