import apiService from "@/services/apiService/apiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        apiService.injectInterceptorResponse(() => {
            navigate('/login', {
                replace: true
            });
        });
    }, []);

    return {};
};

export default useAxiosInterceptor;