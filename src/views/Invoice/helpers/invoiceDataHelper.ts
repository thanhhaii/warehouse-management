import { InvoiceFormType } from "../types/invoiceData";

export const invoiceFormInitialValue: InvoiceFormType = {
    orderProducts: [
        {
            productId: undefined,
            quantity: 1,
            price: 0,
        }
    ]
};