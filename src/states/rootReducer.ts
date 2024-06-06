// Vendor
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';

// Reducer
import authReducer from "@/states/slices/authSlice.ts";
import { AuthState } from './types';
import { authenApi } from "./services/authentication";
import { authPersistConfig } from "./configStore";

export interface IRootState {
    authReducer: AuthState;
}

const rootReducer = (_history?: History, asyncReducers?: any): Reducer => {
    return combineReducers({
        authReducer: persistReducer(authPersistConfig, authReducer),
        authenticationAPI: authenApi.reducer,
        ...asyncReducers
    });
};

export default rootReducer;