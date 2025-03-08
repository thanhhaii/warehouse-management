import { ProForm, ProTable } from '@ant-design/pro-components';
import { Descriptions, Divider, Modal } from 'antd';
import React, { useMemo } from 'react';
import { InvoiceFormType } from '../types/invoiceData';
import { uniqueId } from 'lodash';
import { formatConcurrency } from '@/helpers/numberHelper';

type ModalPreviewInvoiceProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

const TOTAL_CONCAT_ROW = 2;

const ModalPreviewInvoice: React.FC<ModalPreviewInvoiceProps> = ({
    open, 
    onClose,
    onSubmit,
}) => {
    const form = ProForm.useFormInstance<InvoiceFormType>();

    const data = useMemo((): InvoiceFormType => form.getFieldsValue(true), [form]);

    const dataSource = useMemo(() => {
        const totalRow = data?.orderProducts?.reduce((acc, cur) => {
            return acc + (cur.price || 0) * (cur.quantity || 0);
        }, 0);

        const calculatedDataSource = data?.orderProducts?.map((product) => ({
            ...product,
            total: (product.price || 0) * (product.quantity || 0)
        }));

        return calculatedDataSource?.concat([
            {
                total: data.discount || 0,
                productId: 'Phần trăm giảm giá:',
            },
            {
                total: totalRow || 0,
                productId: 'Tổng cộng:',
            }
        ]) || [];
    }, [data]);

    return (
        <Modal
            title="Xem trước hoá đơn"
            width={800}
            open={open}
            onCancel={onClose}
            onOk={onSubmit}>
            <Divider />
            <Descriptions
                items={[
                    {
                        key: 'name',
                        label: 'Họ và tên',
                        children: data.customerName
                    },
                    {
                        key: 'phone',
                        label: 'Số điện thoại',
                        children: data.phone
                    },
                    {
                        key: 'address',
                        label: 'Địa chỉ',
                        children: data.deliveryAddress,
                    },
                    {
                        key: 'description',
                        label: 'Mô tả đơn hàng',
                        children: data.description,
                    }
                ]}/>
            <ProTable
                search={false}
                options={false}
                pagination={false}
                columns={[
                    {
                        valueType: 'index',
                        title: 'STT',
                        onCell: (_, index) => {
                            if((index || 0) >= dataSource.length - TOTAL_CONCAT_ROW){
                                return {
                                    colSpan: 0
                                };
                            }

                            return {};
                        }
                    },
                    {
                        title: 'Tên sản phẩm',
                        dataIndex: 'productId',
                        onCell: (_, index) => {
                            if((index || 0) >= dataSource.length - TOTAL_CONCAT_ROW){
                                return {
                                    colSpan: 4
                                };
                            }

                            return {};
                        }
                    },
                    {
                        title: 'Số lượng',
                        dataIndex: 'quantity',
                        align: 'center',
                        onCell: (_, index) => {
                            if((index || 0) >= dataSource.length - TOTAL_CONCAT_ROW){
                                return {
                                    colSpan: 0
                                };
                            }

                            return {};
                        }
                    },
                    {
                        title: 'Đơn giá',
                        dataIndex: 'price',
                        renderText: (value) => formatConcurrency(value),
                        align: 'right',
                        onCell: (_, index) => {
                            if((index || 0) >= dataSource.length - TOTAL_CONCAT_ROW){
                                return {
                                    colSpan: 0
                                };
                            }

                            return {};
                        }
                    },
                    {
                        title: 'Thành tiền',
                        dataIndex: 'total',
                        align: 'right',
                        renderText: (value) => formatConcurrency(value),
                        onCell: (_, index) => {
                            if(index === dataSource.length - TOTAL_CONCAT_ROW){
                                return {
                                    colSpan: 1
                                };
                            }

                            return {};
                        }
                    }
                ]}
                bordered
                dataSource={dataSource}
                rowKey={(record) => record.productId?.toString() || uniqueId()}
                cardProps={{
                    bodyStyle: {
                        paddingLeft: 0,
                        paddingRight: 0
                    }
                }}
            />
        </Modal>
    );
};

export default ModalPreviewInvoice;