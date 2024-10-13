export type CategoryItem = {
    id: number;
    createDate: number;
    lastModifiedDate: number;
    createdBy: string;
    name: string;
    categoryCode: string;
};

export type GetListCategoryResponse = CategoryItem[];

export type CreateCategoryPayload = {
    name: string;
    createdBy: string;
};

export type CreateCategoryFailedResponse = {
    message: string;
    status: string;
};

export type UpdateCategoryPayload = {
    id: number;
    name: string;
    categoryCode: string;
};

export type UpdateCategoryFailedResponse = CreateCategoryFailedResponse;