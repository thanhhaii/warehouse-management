import { GetDetailResponse, GetListResponse } from "@/types/commonModels";

export type CreateProductPayload = { 
    name: string;
    price: number;
    quantity: number;
    categoryId: string;
    supplierId: string;
};

export type CreateProductResponse = {
    data: string;
    message: string;
};

export type GetListProductResponse = GetListResponse<ProductItem>;
export type GetDetailProductResponse = GetDetailResponse<ProductItem>;

export type ProductQuantity = {
    id: string;
    createDate: number;
    lastModifiedDate: number;
    createdBy: string;
    value: number;
};

export type ProductCategory = {
    id: string;
    createDate: number;
    lastModifiedDate: number;
    createdBy: string;
    name: string;
    categoryCode: string;
};

export type ProductSupplier = {
    id: string;
    createDate: number;
    lastModifiedDate: number;
    createdBy: string;
    name: string;
    phone: string;
    address: string;
    code: string;
};

export type ProductItem = {
    id: string;
    createDate: number;
    description?: string;
    lastModifiedDate: number;
    createdBy: string;
    name: string;
    productCode: string;
    price: number;
    quantity: ProductQuantity;
    category: ProductCategory;
    supplier: ProductSupplier;
    stockQuantity: number;
    imageUrl: string;
};