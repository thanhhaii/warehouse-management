// Vendor
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Src
import { LoginRequest } from "@/services/apiService/requestTypes";
import { LoginResponse } from "@/services/apiService/responseTypes";
import { authActions } from "../slices/authSlice";
import Config from "@/Config";

export const authApi = createApi({
    reducerPath: 'authenticationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: Config.BACKEND_URL }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/signin',
                method: 'POST',
                body,
            }),
            onQueryStarted: async (_, api) => {
                const { dispatch, queryFulfilled } = api;
                const { data } = await queryFulfilled;
                if(data.token){
                    dispatch(authActions.loginSuccess(data.token));
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi;


export const { endpoints, reducerPath, reducer, middleware } = authApi;
