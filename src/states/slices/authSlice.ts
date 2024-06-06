import { AuthState } from "@/states/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialValue: AuthState = {
    isSignedIn: false,
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isSignedIn = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.isSignedIn = false;
            state.token = '';
        }
    }
});

const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export default authReducer;
