// Vendor
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// Src
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
