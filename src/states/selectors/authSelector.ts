import { AppState } from "@/states/types.ts";
import { createSelector } from "@reduxjs/toolkit";

const getAuthReducer = (appStates: AppState) => appStates.auth;

export const selectUserIsSignedIn = createSelector(
    getAuthReducer,
    (state) => state.isSignedIn
);
