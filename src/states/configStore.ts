// Vendor
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import {  PersistConfig } from "redux-persist/es/types";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Src
import { authenApi } from './services/authentication';
import rootReducer from './rootReducer';

const persistConfig: PersistConfig<any, any> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

export const authPersistConfig: PersistConfig<any, any> = { 
    key: 'auth',
    storage,
    stateReconciler: autoMergeLevel2,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer());

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(authenApi.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
