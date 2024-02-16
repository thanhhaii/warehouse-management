export type AuthState = {
    isSignedIn: boolean;
    userInfo?: any;
    role?: any;
};

export type AppState = {
    auth: AuthState;
};
