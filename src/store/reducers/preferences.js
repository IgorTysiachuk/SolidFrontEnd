import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    preferences_list: null
}


export const addPreference = createAction("ADD_PREFERENCE", (array) => {
    return {
        payload: array
    }
})

const preferencesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addPreference, (state, action) => {
            state.preferences_list = action.payload
        })
})
export default preferencesReducer