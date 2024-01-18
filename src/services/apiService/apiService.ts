import axios, { AxiosInstance } from "axios";

interface APIServiceImpl {
    getUser: () => Promise<void>;
}

class ApiService implements APIServiceImpl{
    private readonly axiosInstance: AxiosInstance | undefined;

    constructor() {
        if(!this.axiosInstance){
            this.axiosInstance = axios.create({
                baseURL: 'https://api.example.com',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    async getUser(){
        await this.axiosInstance?.get("/");
    }
}

const apiService = new ApiService();
export default apiService;
