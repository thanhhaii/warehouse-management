import axios, { AxiosInstance, AxiosResponse } from "axios";
import { GetAllUserRequest, LoginRequest } from "@/services/apiService/requestTypes.ts";
import { GetAllUserResponse, LoginResponse } from "@/services/apiService/responseTypes.ts";
import { CreateAccountModel, UpdateAccountModel } from "@/views/Account/models/accountFormModels.ts";
import { AccountModel } from "@/types/accountModels.ts";

interface APIServiceImpl {
    getUser: (request: GetAllUserRequest) => Promise<GetAllUserResponse>;
}

class ApiService implements APIServiceImpl{
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getUser({
        pageSize = 10,
        pageNumber = 0
    }: Partial<GetAllUserRequest>): Promise<GetAllUserResponse>{
        const resp = await this.axiosInstance?.get<GetAllUserResponse>(`/account/findAll?pageSize=${pageSize}&pageNumber=${pageNumber}`);

        return resp?.data ?? [];
    }

    async createUser(payload: CreateAccountModel): Promise<AxiosResponse<string>> {
        return await this.axiosInstance?.post<string>(
            '/account/create',
            payload
        );
    }

    async updateUser(payload: UpdateAccountModel): Promise<AxiosResponse<AccountModel>> {
        return await this.axiosInstance?.put<AccountModel>(
            '/account/update',
            payload
        );
    }

    async deleteUser(accountId: number): Promise<AxiosResponse<string>> {
        return await this.axiosInstance.delete<string>(
            `/account/delete?id=${accountId}`,
        );
    }

    async login(payload: LoginRequest): Promise<LoginResponse> { 
        const resp = await this.axiosInstance.post<LoginResponse>(
            '/auth/login',
            payload
        );

        return resp.data;
    }
}

const apiService = new ApiService();
export default apiService;
