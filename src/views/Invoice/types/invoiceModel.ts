import { ProductItem } from "@/views/Product/types/productModels";

export type OrderItemModel = {
    id: string;
    createDate: string;
    lastModifiedDate: string;
    createdBy: string;
    product: ProductItem;
    quantity: number;
    price: number;
};

export type InvoiceModel = {
    id: string;
    createDate: string;
    lastModifiedDate: string;
    createdBy: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string
    customerAddress: string;
    totalAmount: number;
    status: string,
    orderItems: OrderItemModel[];
};