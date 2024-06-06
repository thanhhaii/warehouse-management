import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../rootReducer";

const getAuthReducer = (appStates: IRootState) => appStates.authReducer;

export const selectUserIsSignedIn = createSelector(
    getAuthReducer,
    (state) => {        
        return state.isSignedIn;
    }
);
