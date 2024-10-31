export type CategoryItem = {
    id: number;
    createDate: number;
    lastModifiedDate: number;
    createdBy: string;
    name: string;
    categoryCode: string;
};

export type GetListCategoryResponse = {
    data: CategoryItem[];
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    totalPage: number;
}
  ;

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

export type GetListCategoryFilter = {
    sortField: string;
    desc: boolean;
    pageSize: number;
    pageNumber: number; // start with 0
    metricFilters: {
        filterField: string;
        value: string;
    }[];
};