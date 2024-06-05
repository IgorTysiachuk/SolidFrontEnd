import { combineReducers, configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./reducers/preferences";
import productsReducer from "./reducers/products";
import VerifedTokenReducer from "./reducers/verifyToken";
import MassageReducer, { setMassage } from "./reducers/massage";

const rootReducer = combineReducers({
    preferences: preferencesReducer,
    products: productsReducer,
    verifedToken: VerifedTokenReducer,
    massage: MassageReducer
})

export const store = configureStore({
    reducer: rootReducer
})