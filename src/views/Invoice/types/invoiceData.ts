export type ProductOrderType = {
    productId: string;
    quantity: number;
    price: number;
};

export type InvoiceFormType = Partial<{
    customerName: string;
    phone: string;
    deliveryAddress: string;
    discount: number;
    orderProducts: Partial<ProductOrderType>[];
    description: string;
}>;