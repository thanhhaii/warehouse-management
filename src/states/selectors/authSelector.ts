import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../rootReducer";
import stringHelpers from "@/helpers/stringHelper";
import dayjs from "dayjs";

const getAuthReducer = (appStates: IRootState) => appStates.authReducer;

export const selectUserIsSignedIn = createSelector(
    getAuthReducer,
    (state) => {        
        if(!state.token || !state.isSignedIn){
            return false;
        }

        const data = stringHelpers.getDataFormToken(state.token);
        if(dayjs().valueOf() < (data?.exp * 1000)) {
            return true;
        }

        return false;
    }
);

export const selectNameOfuser = createSelector(getAuthReducer, (state) => {
    return stringHelpers.getDataFormToken(state.token)?.sub;
});

// export const selectCurrent
