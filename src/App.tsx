// Vendor
import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";

// Src
import './App.css';
import AppRoutes from "./routes/AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={vi_VN}>
                <AppRoutes />
            </ConfigProvider>
        </QueryClientProvider>
    );
}

export default App;
