import { AuthState } from "@/states/types.ts";
import { createSlice } from "@reduxjs/toolkit";

const initialValue: AuthState = {
    isSignedIn: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        loginSuccess: (state) => {
            state.isSignedIn = true;
        }
    }
});

const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export default authReducer;
