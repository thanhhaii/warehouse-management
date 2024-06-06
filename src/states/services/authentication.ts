import { LoginRequest } from "@/services/apiService/requestTypes";
import { LoginResponse } from "@/services/apiService/responseTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "../slices/authSlice";

export const authenApi = createApi({
    reducerPath: 'authenticationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
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

export const { useLoginMutation } = authenApi;


export const { endpoints, reducerPath, reducer, middleware } = authenApi;