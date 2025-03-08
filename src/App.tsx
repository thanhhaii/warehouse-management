// Vendor
import { ConfigProvider, App as AntdApp } from "antd";
import vi_VN from "antd/locale/vi_VN";
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

// Src
import './App.css';
import AppRoutes from "./routes/AppRoutes.tsx";
import { persistor, store } from "@/states/configStore.ts";
import { Suspense } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    return (
        <Suspense fallback={<></>}>
            <Provider store={store}>
                <PersistGate loading={null}
                    persistor={persistor}
                >
                    <AntdApp>
                        <QueryClientProvider client={queryClient}>
                            <ConfigProvider locale={vi_VN}>
                                <AppRoutes />
                            </ConfigProvider>
                        </QueryClientProvider>
                    </AntdApp>
                </PersistGate>
            </Provider>
        </Suspense>
    );
}

export default App;
