import { GetListResponse } from "@/types/commonModels";

export type SupplierModel = { 
    id: string;
    createDate: string;
    lastModifiedDate: string;
    createdBy: string;
    name: string;
    phone: string;
    address: string;
    code: string;
};

export type FormCreateSupplier = Omit<SupplierModel, "id" | "code" | "createDate" | "lastModifiedDate">;
export type CreateSupplierPayload = FormCreateSupplier;

export type GetListSupplierResponse = GetListResponse<SupplierModel>;

export type GetDetailSupplierResponse = {
    message: string;
    data: SupplierModel;
};

export type UpdateSupplierPayload = {
    id: string;
    name: string;
    phone: string;
    address: string;
    code: string;
};