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

        this.axiosInstance.interceptors.request.use(function (config) {
            // Do something before request is sent
            const persistAuth = JSON.parse(localStorage.getItem('persist:root' ) || '{}');
            const token = persistAuth?.authReducer;

            if(token?.isSignedIn && token?.token) {
                return  {
                    ...config, 
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${token?.token}`
                    }
                } as any;
            }

            return {
                ...config
            };
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }

    async getUser({
        pageSize = 10,
        pageNumber = 0
    }: Partial<GetAllUserRequest>): Promise<GetAllUserResponse>{
        const resp = await this.axiosInstance?.get<GetAllUserResponse>(`/user/list?pageSize=${pageSize}&pageNumber=${pageNumber}`);

        return resp?.data ?? [];
    }

    async createUser(payload: CreateAccountModel): Promise<AxiosResponse<string>> {
        return await this.axiosInstance?.post<string>(
            '/auth/signup',
            payload
        );
    }

    async updateUser(payload: UpdateAccountModel): Promise<AxiosResponse<AccountModel>> {
        return await this.axiosInstance?.put<AccountModel>(
            '/user/update',
            payload
        );
    }

    async deleteUser(accountId: number): Promise<AxiosResponse<string>> {
        return await this.axiosInstance.delete<string>(
            `/user/delete?id=${accountId}`,
        );
    }

    async login(payload: LoginRequest): Promise<LoginResponse> { 
        const resp = await this.axiosInstance.post<LoginResponse>(
            '/auth/login',
            payload
        );

        return resp.data;
    }

    async getListCategory<T>(searchName?: string): Promise<T> {
        const resp = await this.axiosInstance.get<T>(
            '/user/category/list',
            {
                params: {
                    name: searchName
                }
            }
        );

        return resp.data;
    }

    async createCategory(name: string, createdBy: string): Promise<number> {
        const resp = await this.axiosInstance.post<number>(
            '/user/category/create',
            {
                createdBy,
                name
            }
        );

        return resp.data;
    }

    async updateCategory(dataUpdate: any): Promise<any> {
        const resp = await this.axiosInstance.put<any>(
            '/user/category/update',
            dataUpdate
        );

        return resp.data;
    }

    // Supplier
    async createSupplier<T = any>(payload: T): Promise<any> {
        const resp = await this.axiosInstance.post(
            '/user/supplier/create',
            payload
        );

        return resp.data;
    }

    async getListSupplier<T = any>(filter?: string): Promise<T> {
        const resp = await this.axiosInstance.get<T>( 
            '/user/supplier/list',
            {
                params: {
                    filter
                }
            }
        );

        return resp.data;
    }

    async getDetailSupplier<T = any>(supplierId: string): Promise<T> {
        const resp = await this.axiosInstance.get<T>(
            `/user/supplier/${supplierId}`
        );

        return resp.data;
    }
}

const apiService = new ApiService();
export default apiService;
