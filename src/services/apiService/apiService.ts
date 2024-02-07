import axios, { AxiosInstance } from "axios";
import { GetAllUserRequest } from "@/services/apiService/requestTypes.ts";
import { GetAllUserResponse } from "@/services/apiService/responseTypes.ts";

interface APIServiceImpl {
    getUser: (request: GetAllUserRequest) => Promise<GetAllUserResponse>;
}

class ApiService implements APIServiceImpl{
    private readonly axiosInstance: AxiosInstance | undefined;

    constructor() {
        if(!this.axiosInstance){
            this.axiosInstance = axios.create({
                baseURL: 'http://192.168.1.70:8080',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    async getUser({
        pageSize = 10,
        pageNumber = 0
    }: Partial<GetAllUserRequest>): Promise<GetAllUserResponse>{
        const resp = await this.axiosInstance?.get<GetAllUserResponse>(`/account/findAll?pageSize=${pageSize}&pageNumber=${pageNumber}`);

        return resp?.data ?? [];
    }
}

const apiService = new ApiService();
export default apiService;
